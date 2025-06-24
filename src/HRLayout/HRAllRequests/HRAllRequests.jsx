import { useContext, useEffect, useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { UserMainContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";
import { Divider } from "@mui/material";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const HRAllRequests = () => {
  const { user } = useContext(UserMainContext);
  const AxiosSecure = useAxiosPrivate();
  const [storedRequests, setStoredRequests] = useState([]);

  const {
    data: PendingRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["PendingRequests"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/pending/hr/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [user?.email, refetch]);
  console.log(PendingRequests);

  let displayRequests =
    (storedRequests.length > 0 ? storedRequests : PendingRequests) || [];

  // search asset
  const searchAsset = async (e) => {
    e.preventDefault();
    const searchText = e.target.searchText.value;
    const encodedSearchQuery = encodeURIComponent(searchText);
    AxiosSecure.get(
      `/pending/request/search/${user.email}?query=${encodedSearchQuery}`
    )
      .then((res) => {
        console.log(res.data);
        setStoredRequests(res.data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        toast.error(`Error search assets: ${error}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

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
        await refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Approved",
          text: `A ${request.name} request approved for ${request.requestByName}`,
          showConfirmButton: true,
        });
        displayRequests = await PendingRequests;
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
    const approveDate = await getCurrentDateTime();
    console.log(approveDate, typeof approveDate);
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
        const resRejectPending = await AxiosSecure.patch(
          `/request/reject?query=${request.assetId}`,
          { approveDate: approveDate }
        );
        const resDeleteRequest = await AxiosSecure.delete(
          `/pending/delete/${request._id}`
        );
        if (
          resRejectPending.data.modifiedCount > 0 &&
          resDeleteRequest.data.deletedCount > 0
        ) {
          await refetch();
          Swal.fire({
            title: "Rejected!",
            text: `Request for ${request.name} has been rejected.`,
            icon: "success",
          });
          displayRequests = await PendingRequests;
        }
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 sm:mt-10 mt-5">
      <Helmet>
        <title>Requests | HR | HR3 Managements</title>
      </Helmet>
      <div className="flex flex-col items-center">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          All Requests
        </h2>
        <p className="sm:text-lg font-medium text-purple-700 mt-2">
          View your employees asset requests.
        </p>
      </div>
      <form
        onSubmit={searchAsset}
        className="flex flex-row flex-nowrap border-2 bg-white text-black shadow-lg rounded-md items-center justify-center mx-auto h-10 font-medium text-lg"
      >
        <input
          type="search"
          name="searchText"
          placeholder="Search Your Asset"
          className="h-full px-3 rounded-md"
        />
        <button className="h-full px-2 text-2xl text-black hover:text-cyan-700 transition">
          <FaSearchPlus />
        </button>
      </form>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <DNA></DNA>
        </div>
      ) : displayRequests.length > 0 ? (
        <div className="mt-5 w-full mx-auto px-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {displayRequests?.map((request) => (
            <div
              data-aos="fade-up"
              key={request._id}
              className="max-w-[300px] overflow-hidden border-2 shadow-lg shadow-gray-300 border-purple-700 rounded-3xl w-full flex flex-col gap-1 mx-auto object-cover rounded-tl-none"
            >
              <div className="w-full h-full flex flex-col gap-1 bg-purple-700 p-2 text-white">
                <h2 className="text-2xl font-bold">{request.name}</h2>
                <h2 className="text-base font-medium">
                  <span className="font-semibold text-gray-200">Type: </span>
                  {request.type}
                </h2>
                {/* <Divider></Divider> */}
              </div>
              <div className="w-full flex flex-col h-full gap-1 p-2">
                <p
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={request.requestByName}
                  data-tooltip-place="top"
                  className="cursor-pointer md:text-lg text-base font-medium text-purple-700 block truncate max-w-none"
                >
                  <span className="font-bold text-black">RequestBy: </span>
                  {request.requestByName}
                </p>
                <p
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={request.requestByEmail}
                  data-tooltip-place="bottom"
                  className="cursor-pointer text-base font-medium text-zinc-600 block truncate max-w-none"
                >
                  <span className="font-bold text-zinc-700">Email: </span>
                  {request.requestByEmail}
                </p>
                <p className="text-base font-medium text-gray-600">
                  <span className="font-bold text-gray-700">Date: </span>
                  {request.requestDate}
                </p>
                <p className="text-base font-medium text-gray-600">
                  <span className="font-bold text-gray-700">Note: </span>
                  {request.additionalNote || "none"}
                </p>
                <p className="text-base font-medium text-zinc-600">
                  <span className="font-bold text-gray-700">Status: </span>
                  {request.status}
                </p>
              </div>
              <div className="w-full flex items-center justify-between gap-2 p-2">
                <button
                  onClick={() => handleApprove(request)}
                  className="relative overflow-hidden group text-base mt-2 font-bold border-2 border-green-700 text-green-800 py-1 w-full rounded-full transition-colors duration-300"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    Approve
                  </span>
                  <span className="absolute inset-0 bg-green-700 z-0 transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
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

export default HRAllRequests;
