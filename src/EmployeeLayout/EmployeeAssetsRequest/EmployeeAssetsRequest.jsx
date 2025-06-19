import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { UserMainContext } from "../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaSearchPlus } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const EmployeeAssetsRequest = () => {
  const { user } = useContext(UserMainContext);
  const AxiosSecure = useAxiosPrivate();
  const [isHoveredFilter, setIsHoveredFilter] = useState(false);
  const [storedAssets, setStoredAssets] = useState([]);

  const { data: employee = [] } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/team/member/${user.email}`);
      return res.data;
    },
  });

  const {
    data: availableAssets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["availableAssets"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/assets/all/${employee.hiredBy}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [employee?.hiredBy]);

  let displayAssets =
    (storedAssets.length > 0 ? storedAssets : availableAssets) || [];

  console.log(employee.hiredBy, availableAssets);

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
  // handle request
  const handleRequest = async (e, asset) => {
    e.preventDefault();
    const name = asset.name;
    const type = asset.type;
    const requestByName = user.displayName;
    const requestByEmail = user.email;
    const requestFor = asset.owner;
    const requestDate = getCurrentDateTime();
    const additionalNote = e.target.message.value;
    const assetId = asset._id;
    const status = "pending";
    const approveDate = "";

    const reqDoc = {
      name,
      type,
      requestByName,
      requestByEmail,
      requestFor,
      requestDate,
      additionalNote,
      assetId,
      status,
      approveDate,
    };
    Swal.fire({
      title: "Are you sure?",
      text: `You want to request for ${name}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send Request!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const postResRequests = await AxiosSecure.post("/requests", reqDoc);
        const postResPending = await AxiosSecure.post("/pending", reqDoc);

        if (postResRequests.status === 200 && postResPending.status === 200) {
          Swal.fire({
            title: "Requested!",
            text: `Requested for ${name}.`,
            icon: "success",
          });
          e.target.reset();
        }
        console.log(reqDoc, postResRequests, postResPending);
      }
    });
  };

  // search asset
  const searchAsset = async (e) => {
    e.preventDefault();
    const searchText = e.target.searchText.value;
    const encodedSearchQuery = encodeURIComponent(searchText);
    AxiosSecure.get(
      `/asset/search/${employee.hiredBy}?query=${encodedSearchQuery}`
    )
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

  // filter
  const Returnable = () => {
    const ReturnableAssets = availableAssets.filter(
      (assets) => assets.type === "returnable"
    );
    setStoredAssets(ReturnableAssets);
  };
  const nonReturnable = () => {
    const nonReturnableAssets = availableAssets.filter(
      (assets) => assets.type === "non-returnable"
    );
    setStoredAssets(nonReturnableAssets);
  };
  const Available = () => {
    const AvailableAssets = availableAssets.filter(
      (assets) => assets.quantity > 0
    );
    setStoredAssets(AvailableAssets);
  };
  const outOfStock = () => {
    const outOfStockAssets = availableAssets.filter(
      (assets) => assets.quantity === 0
    );
    setStoredAssets(outOfStockAssets);
  };

  return (
    <div className="w-full flex flex-col items-center sm:mt-10 mt-5">
      <Helmet>
        <title>Request | Employee | HR3 Managements</title>
      </Helmet>
      <div className="flex flex-col items-center">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Request For Asset
        </h2>
        <p className="sm:text-lg font-medium text-cyan-600 mt-2">
          Find and Request for your needs.
        </p>
      </div>
      <div className="flex flex-row sm:flex-nowrap px-2 flex-wrap-reverse items-center justify-between gap-2 container mx-auto">
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
                <button
                  onClick={Available}
                  className="text-lg font-medium bg-white hover:bg-gray-300 border-2 border-gray-600 w-36 rounded-lg rounded-base p-1 px-1 text-nowrap"
                >
                  Available
                </button>
                <button
                  onClick={outOfStock}
                  className="text-lg font-medium bg-white hover:bg-gray-300 border-2 border-gray-600 w-36 rounded-lg rounded-base p-1 px-1 text-nowrap"
                >
                  Out of Stock
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
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
        </div>
      </div>
      {employee ? (
        isLoading ? (
          <div className="w-full flex items-center justify-center">
            <DNA></DNA>
          </div>
        ) : (
          <div className="w-full mx-auto px-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center  gap-5 mt-5">
            {displayAssets?.map((asset) => (
              <div
                key={asset._id}
                className="h-full max-w-xs mx-auto w-full p-2 border-2 flex flex-col gap-1 rounded-md border-orange-600 justify-between"
              >
                <h2 className="md:text-xl text-lg font-medium">
                  <span className="font-bold">Name: </span>
                  {asset.name}
                </h2>
                <p className="md:text-lg text-base font-medium text-zinc-600">
                  <span className="font-bold text-zinc-700">Type: </span>
                  {asset.type}
                </p>
                <p
                  className={
                    asset.quantity > 0
                      ? "md:text-xl text-lg font-bold text-center text-green-600"
                      : "md:text-xl text-lg font-bold text-center text-red-600"
                  }
                >
                  {asset.quantity > 0 ? "Availble" : "Out Of Stock"}
                </p>

                <form
                  onSubmit={(e) => handleRequest(e, asset)}
                  className="w-full flex flex-col items-center gap-2 justify-between"
                >
                  <textarea
                    id="message"
                    className="w-full min-h-10 placeholder:text-lg placeholder:font-medium text-lg font-medium border-2 rounded-md py-1 px-2"
                    placeholder="Additional Message"
                  ></textarea>
                  <button
                    disabled={!asset.quantity > 0}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={`Request for ${asset.name}`}
                    data-tooltip-place="bottom"
                    className={
                      asset.quantity > 0
                        ? "text-xl mt-2 font-bold transition hover:bg-green-700 border-2 text-green-800 hover:text-white border-green-700 pt-1 pb-2 w-full rounded-full justify-center"
                        : "text-xl mt-2 font-bold bg-gray-700 border-2 text-white border-green-700 pt-1 pb-2 w-full rounded-full justify-center"
                    }
                  >
                    Request
                  </button>
                </form>
              </div>
            ))}
          </div>
        )
      ) : (
        <p className="text-center font-semibold sm:text-xl text-base text-orange-600">
          You&apos;re not joined with any company. <br />
          So, you&apos;re not able to make Request.
        </p>
      )}
    </div>
  );
};

export default EmployeeAssetsRequest;
