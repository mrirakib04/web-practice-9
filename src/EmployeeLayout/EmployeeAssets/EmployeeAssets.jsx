import { useContext, useEffect, useState } from "react";
import { UserMainContext } from "../../Context/UserContext";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaSearchPlus } from "react-icons/fa";
import { DNA } from "react-loader-spinner";
import { MdReportGmailerrorred } from "react-icons/md";
import Swal from "sweetalert2";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

// handle print

const AssetPDF = ({ asset }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text>Company Name: {asset.companyName}</Text>
      </View>
      <View style={styles.section}>
        <Text>Asset Name: {asset.name}</Text>
        <Text>Type: {asset.type}</Text>
        <Text>Status: {asset.status}</Text>
        <Text>Requested Date: {asset.requestDate}</Text>
        <Text>Approved Date: {asset.approveDate || "None"}</Text>
      </View>
      <View style={styles.footer}>
        <Text>Print Date: {new Date().toLocaleDateString()}</Text>
        <Text>SAAS Provider: HR3 Managements</Text>
      </View>
    </Page>
  </Document>
);
AssetPDF.propTypes = {
  asset: PropTypes.object?.isRequired,
};

const EmployeeAssets = () => {
  const { user } = useContext(UserMainContext);
  const AxiosSecure = useAxiosPrivate();
  const [isHoveredFilter, setIsHoveredFilter] = useState(false);
  const [storedAssetRequests, setStoredAssetRequests] = useState([]);

  const {
    data: assetRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["assetRequests"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/asset/requests/${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [user?.email, refetch]);

  let displayAssetRequest =
    (storedAssetRequests.length > 0 ? storedAssetRequests : assetRequests) ||
    [];

  // search asset
  const searchAsset = async (e) => {
    e.preventDefault();
    const searchText = e.target.searchText.value;
    const encodedSearchQuery = encodeURIComponent(searchText);
    AxiosSecure.get(
      `/asset/request/search/${user?.email}?query=${encodedSearchQuery}`
    )
      .then((res) => {
        console.log(res.data);
        setStoredAssetRequests(res.data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        toast.error(`Error search asset request: ${error}`, {
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
    const ReturnableAssets = assetRequests.filter(
      (assets) => assets.type === "returnable"
    );
    setStoredAssetRequests(ReturnableAssets);
  };
  const nonReturnable = () => {
    const nonReturnableAssets = assetRequests.filter(
      (assets) => assets.type === "non-returnable"
    );
    setStoredAssetRequests(nonReturnableAssets);
  };
  const Approved = () => {
    const approvedAssets = assetRequests.filter(
      (assets) => assets.status === "approved"
    );
    setStoredAssetRequests(approvedAssets);
  };
  const Pending = () => {
    const pendingAssets = assetRequests.filter(
      (assets) => assets.status === "pending"
    );
    setStoredAssetRequests(pendingAssets);
  };

  // request delete
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
          await refetch();
          setStoredAssetRequests(assetRequests);
          displayAssetRequest = assetRequests;
        }
      }
    });
  };

  // handle retun
  const handleReturn = async (asset) => {
    const getAsset = await AxiosSecure.get(`/asset/${asset.assetId}`);
    console.log(getAsset);
    if (getAsset.data.quantity) {
      const quantity = getAsset.data.quantity + 1;
      console.log(
        "quantity quantity quantity quantity ",
        getAsset.data.quantity,
        quantity,
        asset._id
      );

      Swal.fire({
        title: "Are you sure?",
        text: `You want to return ${asset.name}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, return!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const updateDoc = { quantity };
          const resUpdateQuantity = await AxiosSecure.patch(
            `/quantity/update/${asset.assetId}`,
            updateDoc
          );

          const deleteAllReqsRes = await AxiosSecure.delete(
            `/request/return/delete?query=${asset._id}`
          );

          if (
            resUpdateQuantity.status === 200 &&
            deleteAllReqsRes.status === 200
          ) {
            Swal.fire({
              title: "Returned!",
              text: `${asset.name} Returned.`,
              icon: "success",
            });
            refetch();
            setStoredAssetRequests(assetRequests);
            displayAssetRequest = assetRequests;
          }
        }
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center sm:mt-10 mt-5">
      <Helmet>
        <title>Assets | Employee | HR3 Managements</title>
      </Helmet>
      <div className="flex flex-col items-center">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          All Asset Requests
        </h2>
        <p className="sm:text-lg font-medium text-violet-600 mt-2">
          View your all assets requests.
        </p>
      </div>
      <div className="flex flex-row sm:flex-nowrap px-2 flex-wrap-reverse items-center justify-between gap-2 container mx-auto mt-5">
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
                  onClick={Approved}
                  className="text-lg font-medium bg-white hover:bg-gray-300 border-2 border-gray-600 w-36 rounded-lg rounded-base p-1 px-1 text-nowrap"
                >
                  Approved
                </button>
                <button
                  onClick={Pending}
                  className="text-lg font-medium bg-white hover:bg-gray-300 border-2 border-gray-600 w-36 rounded-lg rounded-base p-1 px-1 text-nowrap"
                >
                  Pending
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
              placeholder="Search Your Request"
              className="h-full px-3 rounded-md"
            />
            <button className="h-full px-2 text-2xl text-black hover:text-cyan-700 transition">
              <FaSearchPlus></FaSearchPlus>
            </button>
          </form>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <DNA></DNA>
        </div>
      ) : displayAssetRequest.length > 0 ? (
        <div className="mt-5 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-5 container px-2 mx-auto w-full">
          {displayAssetRequest?.map((request) => (
            <div
              key={request._id}
              className="w-full h-full flex flex-col sm:max-w-none max-w-sm mx-auto items-start justify-between p-3 gap-2 border-2 rounded-lg border-violet-800 shadow-lg shadow-violet-100"
            >
              <div className="w-full">
                <h2 className="text-2xl font-semibold">{request.name}</h2>
              </div>
              <p className="flex gap-1 text-base font-medium text-zinc-600">
                <span className="font-bold text-zinc-700">Type:</span>
                {request.type}
              </p>
              <p className="flex gap-1 text-base font-medium text-zinc-600">
                <span className="font-bold text-zinc-700">Status:</span>
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

              <p className="flex gap-1 flex-wrap text-base font-medium text-zinc-600">
                <span className="font-bold text-zinc-700">Requested Date:</span>
                {request.requestDate}
              </p>
              <p className="flex gap-1 flex-wrap text-base font-medium text-zinc-600">
                <span className="font-bold text-zinc-700">Approved Date:</span>
                {request.approveDate || "none"}
              </p>

              <div className="flex items-center gap-3 w-full justify-between">
                {request.status === "approved" &&
                  request.type === "returnable" && (
                    <button
                      onClick={() => handleReturn(request)}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={`Return the ${request.name}`}
                      data-tooltip-place="bottom"
                      className="text-xl mt-2 font-bold transition hover:bg-emerald-700 border-2 text-emerald-800 hover:text-white border-emerald-700 pt-1 pb-2 w-full rounded-full justify-center"
                    >
                      Return
                    </button>
                  )}
                {request.status === "approved" && (
                  <PDFDownloadLink
                    className="w-full"
                    document={<AssetPDF asset={request} />}
                    fileName={`${request.name}-details.pdf`}
                  >
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={`Print the approved request of ${request.name}`}
                      data-tooltip-place="bottom"
                      className="text-xl mt-2 font-bold transition hover:bg-blue-700 border-2 text-blue-800 hover:text-white border-blue-700 pt-1 pb-2 w-full rounded-full justify-center"
                    >
                      Print
                    </button>
                  </PDFDownloadLink>
                )}
                {request.status === "pending" && (
                  <button
                    onClick={() => handleDelete(request.assetId)}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={`Cancel request of ${request.name}`}
                    data-tooltip-place="bottom"
                    className="text-xl mt-2 font-bold transition hover:bg-red-700 border-2 text-red-800 hover:text-white border-red-700 pt-1 pb-2 w-full rounded-full justify-center"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-lg font-medium text-red-800 flex gap-1 items-center">
          You have not made any request.
          <MdReportGmailerrorred className="text-2xl"></MdReportGmailerrorred>
        </p>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  page: { padding: 20 },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 2,
  },
  section: { fontSize: 14, marginBottom: 20, textAlign: "center", padding: 10 },
  footer: { fontSize: 12, marginTop: 10, textAlign: "center" },
});

export default EmployeeAssets;
