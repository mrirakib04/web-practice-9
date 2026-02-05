import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { UserMainContext } from "../../Context/UserContext";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { FaSearchPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  FaPenToSquare,
  FaRegCircleCheck,
  FaRegPenToSquare,
} from "react-icons/fa6";
import Swal from "sweetalert2";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { AiOutlineCloseCircle } from "react-icons/ai";

const HRAssetsList = () => {
  const { user } = useContext(UserMainContext);
  const AxiosSecure = useAxiosPrivate();
  const navigate = useNavigate();

  // Dropdown
  const [isHoveredSort, setIsHoveredSort] = useState(false);
  const [isHoveredFilter, setIsHoveredFilter] = useState(false);
  const [storedAssets, setStoredAssets] = useState([]);

  const [sortType, setSortType] = useState("all");
  const {
    data: assets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/assets/${sortType}/${user.email}`);
      return res.data || [];
    },
  });

  let displayAssets = (storedAssets.length > 0 ? storedAssets : assets) || [];

  const sortQuantityBTN = async () => {
    await setSortType("quantity");
    await refetch();
    setStoredAssets([]);
    displayAssets = storedAssets;
    console.log(storedAssets);
  };
  const sortAllBTN = async () => {
    await setSortType("all");
    await refetch();
    setStoredAssets([]);
    displayAssets = storedAssets;
    console.log(storedAssets);
  };

  // filter
  const Returnable = () => {
    const ReturnableAssets = assets.filter(
      (assets) => assets.type === "returnable"
    );
    setStoredAssets(ReturnableAssets);
  };
  const nonReturnable = () => {
    const nonReturnableAssets = assets.filter(
      (assets) => assets.type === "non-returnable"
    );
    setStoredAssets(nonReturnableAssets);
  };

  // search asset
  const searchAsset = async (e) => {
    e.preventDefault();
    const searchText = e.target.searchText.value;
    const encodedSearchQuery = encodeURIComponent(searchText);
    AxiosSecure.get(`/asset/search/${user.email}?query=${encodedSearchQuery}`)
      .then((res) => {
        console.log(res.data);
        setStoredAssets(res.data);
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

  return (
    <div className="w-full flex flex-col items-center sm:gap-5 gap-2 px-5">
      <div className="flex flex-col items-center sm:mt-10 mt-5">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Your Assets List
        </h2>
        <p className="sm:text-lg font-medium text-sky-600 mt-2">
          View and Update your assets.
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
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div>
          <div
            className="relative"
            onClick={() => setIsHoveredFilter(!isHoveredFilter)}
          >
            <button className="font-semibold text-xl">Filter</button>
            {isHoveredFilter && (
              <div
                className={
                  isHoveredFilter
                    ? "flex md:flex-row  flex-col items-center gap-2 absolute z-40 py-1 ml-3"
                    : ""
                }
              >
                <button
                  onClick={Returnable}
                  className="text-lg font-medium bg-white hover:bg-gray-300 border-2 border-gray-600 w-36 rounded-lg rounded-base p-1 px-1 text-nowrap"
                >
                  Returnable
                </button>
                <button
                  onClick={nonReturnable}
                  className="text-lg font-medium bg-white hover:bg-gray-300 border-2 border-gray-600 w-36 rounded-lg rounded-base p-1 px-1 text-nowrap"
                >
                  Non-Returnable
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <div
            className="relative"
            onClick={() => setIsHoveredSort(!isHoveredSort)}
          >
            <button className="font-semibold text-xl">Sort </button>
            {isHoveredSort && (
              <div
                className={
                  isHoveredSort
                    ? "flex sm:flex-row flex-col items-center gap-2 absolute z-40 py-1 mr-2 right-1"
                    : ""
                }
              >
                <button
                  onClick={sortAllBTN}
                  className="text-xl font-medium bg-white hover:bg-cyan-200 border-2 border-gray-600 w-32 rounded-lg rounded-base p-1 px-1 text-nowrap"
                >
                  All
                </button>
                <button
                  onClick={sortQuantityBTN}
                  className="text-xl font-medium bg-white hover:bg-cyan-200 border-2 border-gray-600 w-32 rounded-lg rounded-base p-1 px-1 text-nowrap"
                >
                  Quantity
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <DNA></DNA>
        </div>
      ) : (
        <div className="lg:w-11/12 w-full mx-auto px-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-5 md:mt-10 sm:mt-8 mt-6">
          {displayAssets?.map((asset) => (
            <div
              data-aos="zoom-in-up"
              key={asset._id}
              className="max-w-xs mx-auto w-full h-full p-4 border-2 flex flex-col justify-between gap-1 border-sky-100 bg-gradient-to-t from-sky-100 via-white to-white shadow-md transition-all hover:from-sky-200 hover:shadow-xl duration-300 rounded-b-xl"
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
                      <FaRegPenToSquare></FaRegPenToSquare>
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
      )}
    </div>
  );
};

export default HRAssetsList;
