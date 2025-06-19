import { useContext, useEffect } from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { UserMainContext } from "../../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";
import { Divider } from "@mui/material";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PendingRequests = () => {
  const AxiosSecure = useAxiosPrivate();
  const { user } = useContext(UserMainContext);

  const {
    data: PendingRecentRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["PendingRecentRequests"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/pending/recent/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [user?.email]);
  console.log("recent requests", PendingRecentRequests, user?.email);

  // time
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    let hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;
  };
  // handle approve
  const handleApprove = async (request) => {
    console.log(request.assetId);
    const resAsset = await AxiosSecure.get(`/asset/${request.assetId}`);
    console.log(resAsset.data.quantity);
    const quantity = resAsset.data.quantity - 1;
    const approveDate = getCurrentDateTime();
    if (!quantity < 0 || quantity === 0 || quantity > 0) {
      console.log(quantity);

      const resApprove = await AxiosSecure.patch(
        `/request/approve/${request.assetId}`,
        { approveDate }
      );
      const updateDoc = { quantity };
      const resUpdateQuantity = await AxiosSecure.patch(
        `/quantity/update/${request.assetId}`,
        updateDoc
      );
      const resDeletePending = await AxiosSecure.delete(
        `/pending/delete/${request._id}`
      );

      console.log(resApprove, resUpdateQuantity, resDeletePending);

      if (
        resApprove.data.modifiedCount > 0 &&
        resUpdateQuantity.data.modifiedCount > 0 &&
        resDeletePending.data.deletedCount > 0
      ) {
        console.log(
          resApprove.data.modifiedCount,
          resUpdateQuantity.data.modifiedCount,
          resDeletePending.data.deletedCount
        );
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Approved",
          text: `A ${request.name} request approved for ${request.requestByName}`,
          showConfirmButton: true,
        });
      }
    } else {
      toast.info(`${resAsset.data.name} is out of stock`, {
        position: "top-right",
        autoClose: 2000,
        closeButton: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // handle reject
  const handleReject = async (request) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to reject the request for ${request.name}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject It!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resDeletePending = await AxiosSecure.delete(
          `/request/delete?query=${request.assetId}`
        );
        const resDeleteRequest = await AxiosSecure.delete(
          `/pending/delete/${request._id}`
        );

        if (
          resDeletePending.data.deletedCount > 0 &&
          resDeleteRequest.data.deletedCount > 0
        ) {
          refetch();
          Swal.fire({
            title: "Requested!",
            text: `Request for ${request.name} has been rejected.`,
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="w-full sm:mb-10 mb-5">
      <div className="w-full flex flex-col items-center">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Pending Requests
        </h2>
        <p className="sm:text-lg font-medium text-lime-600 mt-2 text-center">
          View recent pending asset requests.
        </p>
      </div>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <DNA></DNA>
        </div>
      ) : PendingRecentRequests?.length > 0 ? (
        <div className="mt-5 w-full mx-auto px-5 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {PendingRecentRequests?.map((request) => (
            <div
              key={request._id}
              className="max-w-[300px] p-2 border-2 shadow-lg shadow-lime-100 border-lime-800 rounded-xl w-full flex flex-col gap-1 mx-auto object-cover"
            >
              <h2 className="md:text-xl text-lg font-medium">
                <span className="font-bold">Name: </span>
                {request.name}
              </h2>
              <h2 className="md:text-xl text-lg font-medium">
                <span className="font-bold">Type: </span>
                {request.type}
              </h2>
              <Divider></Divider>
              <div className="w-full flex flex-col h-full justify-between gap-1">
                <p
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={request.requestByName}
                  data-tooltip-place="top"
                  className="cursor-pointer md:text-lg text-base font-medium text-lime-700 block truncate max-w-none"
                >
                  <span className="font-bold text-zinc-700">RequestBy: </span>
                  {request.requestByName}
                </p>
                <p
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={request.requestByEmail}
                  data-tooltip-place="bottom"
                  className="cursor-pointer md:text-lg text-base font-medium text-zinc-600 block truncate max-w-none"
                >
                  <span className="font-bold text-zinc-700">Email: </span>
                  {request.requestByEmail}
                </p>
                <p className="md:text-lg text-base font-medium text-zinc-600">
                  <span className="font-bold text-zinc-700">Date: </span>
                  {request.requestDate}
                </p>
                <p className="md:text-lg text-base font-medium text-zinc-600">
                  <span className="font-bold text-zinc-700">Note: </span>
                  {request.additionalNote || "none"}
                </p>
                <p className="md:text-lg text-base font-medium text-zinc-600">
                  <span className="font-bold text-zinc-700">Status: </span>
                  {request.status}
                </p>
              </div>
              <div className="w-full flex items-center justify-between gap-2">
                <button
                  onClick={() => handleApprove(request)}
                  className="text-base mt-2 font-bold transition hover:bg-green-700 border-2 text-green-800 hover:text-white border-green-700 py-1 w-full rounded-full"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request)}
                  className="text-base mt-2 font-bold transition hover:bg-red-700 border-2 text-red-800 hover:text-white border-red-700 py-1 w-full rounded-full"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-center mt-5 text-orange-600 font-semibold">
          No pending requests here.
        </p>
      )}
    </div>
  );
};

export default PendingRequests;
