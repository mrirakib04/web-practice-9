import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useContext } from "react";
import { UserMainContext } from "../../../Context/UserContext";
import { FaPenToSquare, FaRegCircleCheck } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { DNA } from "react-loader-spinner";
import { AiOutlineCloseCircle } from "react-icons/ai";

const LimitedStockItems = () => {
  const AxiosSecure = useAxiosPrivate();
  const { user } = useContext(UserMainContext);
  const navigate = useNavigate();

  const {
    data: limited = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["limited"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/assets/limited?query=${user.email}`);
      return res.data;
    },
  });

  const handleDeleteAsset = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      iconColor: "red",
      confirmButtonColor: "#c22717",
      cancelButtonColor: "#038a07",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteRes = await AxiosSecure.delete(`/asset/delete?query=${id}`);
        if (deleteRes.data.deletedCount > 0) {
          console.log(deleteRes.data.deletedCount);
          Swal.fire({
            title: "Deleted!",
            text: "Your asset has been deleted.",
            icon: "success",
            confirmButtonColor: "#038a07",
          });
          refetch();
        }
      }
    });
  };

  const assetEdit = (id) => {
    navigate(`/hr/dashboard/edit/asset/${id}`);
  };

  console.log(limited);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col p-2 items-center mt-16">
        <h2 className="lg:text-5xl sm:text-3xl text-2xl font-semibold">
          Limited Stock
        </h2>
        <p className="sm:text-lg font-medium text-amber-600 mt-2 text-center">
          Check assets that are currently running low in stock.
        </p>
      </div>

      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <DNA></DNA>
        </div>
      ) : limited.length > 0 ? (
        <div className="lg:w-11/12 w-full mx-auto px-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-5 md:mt-10 sm:mt-8 mt-6">
          {limited?.map((asset) => (
            <div
              data-aos="zoom-out-up"
              key={asset._id}
              className="max-w-xs mx-auto w-full h-full p-4 border-2 flex flex-col justify-between gap-1 border-amber-100 bg-gradient-to-t from-amber-100 via-white to-white shadow-md transition-all hover:from-amber-200 hover:shadow-xl duration-300"
            >
              <h2 className="md:text-3xl text-2xl font-semibold text-start">
                {asset.name}
              </h2>
              <div className="w-full">
                <div className="mt-6 flex justify-between items-start">
                  <div className="flex flex-col w-full">
                    <span className="text-sm font-medium text-gray-500">
                      Quantity:
                    </span>
                    <p className="text-2xl font-medium text-white bg-sky-800 text-center mt-1 rounded-xl py-1 px-4 w-fit">
                      {asset.quantity}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-gray-500">
                      Returnable:
                    </span>
                    {asset.type === "returnable" ? (
                      <FaRegCircleCheck
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={"Yes"}
                        data-tooltip-place="left"
                        className="text-3xl text-orange-500"
                      ></FaRegCircleCheck>
                    ) : (
                      <AiOutlineCloseCircle
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={"No"}
                        data-tooltip-place="left"
                        className="text-3xl text-lime-500"
                      ></AiOutlineCloseCircle>
                    )}
                  </div>
                </div>
                <p className="md:text-lg text-base font-medium text-black flex gap-1 mt-3 flex-wrap">
                  <span className="font-semibold text-gray-500">
                    Entry Date:
                  </span>
                  {asset.date}
                </p>

                <div className="w-full flex flex-wrap items-center gap-2 justify-between mt-4">
                  <button
                    onClick={() => assetEdit(asset._id)}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={`Update ${asset.name} Details`}
                    data-tooltip-place="bottom"
                    className="relative overflow-hidden group text-xl border-2 border-green-700 text-green-800 p-2 rounded-full transition-colors duration-300"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                      <FaPenToSquare />
                    </span>
                    <span className="absolute inset-0 bg-green-700 z-0 transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                  </button>

                  <button
                    onClick={() => handleDeleteAsset(asset._id)}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={`Delete ${asset.name}`}
                    data-tooltip-place="bottom"
                    className="text-xl transition hover:bg-red-700 border-2 text-red-800 hover:text-white border-red-700 p-2 rounded-full"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container mx-auto px-2">
          <p className="text-xl font-medium text-green-800 text-center">
            All assets are stocked.
          </p>
        </div>
      )}
    </div>
  );
};

export default LimitedStockItems;
