import { useContext } from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { UserMainContext } from "../../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";
import { Divider } from "@mui/material";

const TopRequestedItems = () => {
  const AxiosSecure = useAxiosPrivate();
  const { user } = useContext(UserMainContext);

  const {
    data: topRequestedAssets = [],
    isLoading: topRequestedAssetsLoading,
  } = useQuery({
    queryKey: ["topRequestedAssets"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/top/requested/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log("top", topRequestedAssets);

  return (
    <div className="w-full mt-10 sm:mb-10 mb-5">
      <div className="w-full flex flex-col items-center p-2">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Top Requested Assets
        </h2>
        <p className="sm:text-lg font-medium text-purple-600 mt-2 text-center">
          View top requested assets overview and insights.
        </p>
      </div>
      {topRequestedAssetsLoading ? (
        <div className="w-full flex items-center justify-center">
          <DNA></DNA>
        </div>
      ) : topRequestedAssets ? (
        <div className="lg:w-11/12 mt-5 w-full mx-auto px-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {topRequestedAssets?.map((request) => (
            <div
              data-aos="fade-up"
              key={request._id}
              className="max-w-[300px] overflow-hidden border-2 shadow-lg shadow-gray-300 border-purple-300 rounded-tr-xl w-full flex flex-col gap-1 mx-auto object-cover p-3 bg-gradient-to-bl from-purple-300 via-white to-white"
            >
              <div className="w-full h-full flex flex-col gap-1 text-black">
                <h2 className="text-2xl font-bold">{request.name}</h2>
                <h2 className="text-base font-medium">
                  <span className="font-semibold text-gray-700">Type: </span>
                  {request.type}
                </h2>
                <Divider></Divider>
              </div>
              <div className="w-full flex flex-col h-full gap-1 mt-2">
                <p className="text-base font-medium text-gray-500">
                  Number of Times Requested:
                </p>
                <span className="text-lg font-bold text-white bg-emerald-800 text-center mt-1 rounded-xl py-1 px-4 w-fit">
                  {request.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-center mt-5 text-orange-600 font-semibold">
          No requested assets here.
        </p>
      )}
    </div>
  );
};

export default TopRequestedItems;
