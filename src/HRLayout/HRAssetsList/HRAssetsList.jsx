import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { UserMainContext } from "../../Context/UserContext";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { FaSearchPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaPenToSquare } from "react-icons/fa6";
import Swal from "sweetalert2";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>Assets | HR | HR3 Managements</title>
      </Helmet>
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
        <div className="flex flex-col items-center max-w-6xl w-full mx-auto gap-5">
          {displayAssets?.map((asset) => (
            <div
              key={asset._id}
              className="w-full md:p-5 p-3 border-2 border-indigo-600 rounded-lg flex lg:flex-row gap-5 flex-col items-center justify-between"
            >
              <div className="w-full flex items-center justify-between">
                <h2 className="md:text-xl text-lg font-medium">
                  <span className="font-bold">Name: </span>
                  {asset.name}
                </h2>
                <p className="md:text-xl text-lg font-medium text-zinc-600">
                  <span className="font-bold text-zinc-700">Quantity: </span>
                  {asset.quantity}
                </p>
              </div>
              <div className="w-full flex flex-wrap items-center gap-2 lg:justify-evenly justify-between">
                <p className="md:text-lg text-base font-medium text-zinc-600">
                  <span className="font-bold text-zinc-700">Type: </span>
                  {asset.type}
                </p>
                <p className="md:text-lg text-base font-medium text-zinc-600">
                  <span className="font-bold text-zinc-700">Added Date: </span>
                  {asset.date}
                </p>
              </div>
              <div className="w-fit flex sm:flex-nowrap flex-wrap items-center gap-2 lg:justify-evenly justify-between">
                <button
                  onClick={() => assetEdit(asset._id)}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={`Update ${asset.name} Details`}
                  data-tooltip-place="bottom"
                  className="text-2xl transition hover:bg-green-700 border-2 text-green-800 hover:text-white border-green-700 p-3 rounded-full"
                >
                  <FaPenToSquare></FaPenToSquare>
                </button>
                <button
                  onClick={() => handleDeleteAsset(asset._id)}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={`Delete ${asset.name}`}
                  data-tooltip-place="bottom"
                  className="text-2xl transition hover:bg-red-700 border-2 text-red-800 hover:text-white border-red-700 p-3 rounded-full"
                >
                  <FaTrashAlt></FaTrashAlt>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HRAssetsList;
