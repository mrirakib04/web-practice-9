import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useContext } from "react";
import { UserMainContext } from "../../../Context/UserContext";
import { DNA } from "react-loader-spinner";
import { FaCircleInfo } from "react-icons/fa6";
import Swal from "sweetalert2";

const MyPendingRequests = () => {
  const AxiosSecure = useAxiosPrivate();
  const { user } = useContext(UserMainContext);

  const {
    data: PendingRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["PendingRequests"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/pending/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this request!",
      icon: "warning",
      showCancelButton: true,
      iconColor: "red",
      confirmButtonColor: "#c22717",
      cancelButtonColor: "#038a07",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteRes = await AxiosSecure.delete(
          `/pending/delete?query=${id}`
        );
        const deleteAllReqsRes = await AxiosSecure.delete(
          `/request/delete?query=${id}`
        );
        if (
          deleteRes.data.deletedCount > 0 ||
          deleteAllReqsRes.data.deletedCount > 0
        ) {
          console.log(deleteRes.data.deletedCount);
          Swal.fire({
            title: "Deleted!",
            text: "Your request has been deleted.",
            icon: "success",
            confirmButtonColor: "#038a07",
          });
          refetch();
        }
      }
    });
  };

  console.log(PendingRequests);

  return (
    <div className="w-full flex flex-col items-center sm:mt-10 mt-5">
      <div className="w-full flex flex-col items-center">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Pending Requests
        </h2>
        <p className="sm:text-lg font-medium text-violet-600 mt-2 text-center">
          View and manage your current pending asset requests.
        </p>
      </div>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <DNA></DNA>
        </div>
      ) : PendingRequests.length > 0 ? (
        <div className="w-full container mx-auto px-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-5">
          {PendingRequests.map((request) => (
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              key={request._id}
              className="max-w-[300px] overflow-hidden border-2 shadow-lg shadow-gray-300 border-violet-800 rounded-xl w-full flex flex-col gap-1 mx-auto rounded-tl-none"
            >
              <div className="w-full bg-purple-700 text-white p-2 h-full">
                <h2 className="text-2xl font-semibold">{request.name}</h2>
              </div>
              <div className="w-full p-2">
                <p className="text-lg font-medium text-gray-600">
                  <span className="font-bold text-gray-700">Type: </span>
                  {request.type}
                </p>
                <p className="text-base font-medium text-gray-600">
                  <span className="font-bold text-gray-700">Message: </span>
                  {request.additionalNote || "none"}
                </p>
                <p className="text-base font-medium text-gray-600">
                  <span className="font-bold text-gray-700">Requested: </span>
                  {request.requestDate}
                </p>
              </div>
              <div className="w-full p-2">
                <button
                  onClick={() => handleDelete(request.assetId)}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={`Cancel request of ${request.name}`}
                  data-tooltip-place="bottom"
                  className="text-xl mt-2 font-bold duration-300 hover:bg-red-700 border-2 text-red-800 hover:text-white border-red-700 pb-1 w-full rounded-full justify-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="sm:text-xl text-lg font-semibold text-orange-600 flex flex-col items-center mt-5">
          <FaCircleInfo className="sm:text-2xl text-xl"></FaCircleInfo> <br />{" "}
          No pending requests here.
        </p>
      )}
    </div>
  );
};

export default MyPendingRequests;
