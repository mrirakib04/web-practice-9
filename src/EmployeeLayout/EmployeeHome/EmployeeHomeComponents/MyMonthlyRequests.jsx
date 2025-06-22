import { useContext } from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { UserMainContext } from "../../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";
import { FaCircleInfo } from "react-icons/fa6";
import { Divider } from "@mui/material";

const MyMonthlyRequests = () => {
  const AxiosSecure = useAxiosPrivate();
  const { user } = useContext(UserMainContext);

  const { data: MonthlyRequests = [], isLoading } = useQuery({
    queryKey: ["MonthlyRequests"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/monthly/requests/${user.email}`);
      return res.data;
    },
  });
  return (
    <div className="w-full flex flex-col items-center lg:mt-14 mt-10">
      <div className="w-full flex flex-col items-center">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Monthly Requests
        </h2>
        <p className="sm:text-lg font-medium text-teal-600 mt-2 text-center">
          View your monthly assets requests.
        </p>
      </div>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <DNA></DNA>
        </div>
      ) : MonthlyRequests.length > 0 ? (
        <div className="w-full container mx-auto px-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-5">
          {MonthlyRequests.map((request) => (
            <div
              key={request._id}
              className="max-w-[300px] p-3 border-2 shadow-lg border-teal-800 rounded-lg w-full h-full flex flex-col justify-start gap-2 mx-auto rounded-tl-none"
            >
              <h2 className="text-2xl font-bold">{request.name}</h2>
              <Divider></Divider>
              <div className="w-full flex flex-col gap-1">
                <p className="text-lg font-medium text-gray-600 flex gap-1">
                  <span className="font-semibold text-gray-700">Type:</span>
                  {request.type}
                </p>
                <p className="text-base font-medium text-gray-600 flex gap-1">
                  <span className="font-semibold text-gray-700">Message:</span>
                  {request.additionalNote || "none"}
                </p>
                <p className="text-base font-medium text-gray-600 flex gap-1">
                  <span className="font-semibold text-gray-700">
                    Requested:
                  </span>
                  {request.requestDate}
                </p>
                <p className="text-base font-medium text-gray-600 flex gap-1">
                  <span className="font-semibold text-gray-700">Approved:</span>
                  {request.approvedDate || "none"}
                </p>
                <p className="text-base font-medium text-gray-600 flex gap-1">
                  <span className="font-semibold text-gray-700">Status:</span>
                  <span
                    className={
                      (request.status === "rejected" &&
                        "text-red-600 font-bold") ||
                      (request.status === "pending" &&
                        "text-orange-600 font-bold") ||
                      "text-green-600 font-bold"
                    }
                  >
                    {request.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="sm:text-xl text-lg font-semibold text-orange-600 flex flex-col items-center mt-5">
          <FaCircleInfo className="sm:text-2xl text-xl"></FaCircleInfo> <br />
          No pending requests here.
        </p>
      )}
    </div>
  );
};

export default MyMonthlyRequests;
