import { useContext } from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { UserMainContext } from "../../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";
import { FaCircleInfo } from "react-icons/fa6";

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
    <div className="w-full flex flex-col items-center sm:mt-10 mt-5">
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
              className="max-w-[300px] p-5 border-2 shadow-lg shadow-violet-300 border-violet-800 rounded-xl w-full flex flex-col justify-between gap-2 mx-auto"
            >
              <h2 className="md:text-xl text-lg font-medium">
                <span className="font-bold">Name: </span>
                {request.name}
              </h2>
              <p className="md:text-xl text-lg font-medium text-zinc-600">
                <span className="font-bold text-zinc-700">Type: </span>
                {request.type}
              </p>
              <p className="md:text-lg text-base font-medium text-zinc-600">
                <span className="font-bold text-zinc-700">Message: </span>
                {request.additionalNote || "none"}
              </p>
              <p className="md:text-lg text-base font-medium text-zinc-600">
                <span className="font-bold text-zinc-700">Requested: </span>
                {request.requestDate}
              </p>
              <p className="md:text-lg text-base font-medium text-zinc-600">
                <span className="font-bold text-zinc-700">Approved: </span>
                {request.approvedDate || "none"}
              </p>
              <p className="md:text-lg text-base font-medium text-zinc-600">
                <span className="font-bold text-zinc-700">Status: </span>
                <span
                  className={
                    request.status === "pending"
                      ? "text-orange-600 font-medium"
                      : "text-green-600 font-medium"
                  }
                >
                  {request.status}
                </span>
              </p>
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

export default MyMonthlyRequests;
