import {
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useParams } from "react-router";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const HRUpdateAsset = () => {
  const params = useParams();
  const id = params.id;
  const AxiosSecure = useAxiosPrivate();
  const [updateAsset, setUpdateAsset] = useState([]);

  const getAsset = async () => {
    AxiosSecure.get(`/asset/${id}`)
      .then((res) => setUpdateAsset(res.data || []))
      .catch((error) => {
        toast.error(`Error loading asset: ${error}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  useEffect(() => {
    getAsset();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name.value;
    const quantity = parseInt(target.quantity.value);
    const type = target.type.value;
    const date = updateAsset.date;
    const owner = updateAsset.owner;

    const updateDoc = { name, quantity, type, date, owner };
    console.log(id, updateDoc);

    AxiosSecure.put(`/update/asset/${id}`, updateDoc)
      .then((response) => {
        if (response.status == 200) {
          toast.success(`Your asset updated.`, {
            position: "top-right",
            autoClose: 2000,
            closeButton: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .catch((error) => {
        toast.error(`Something wrong: ${error.message} 💔`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <div className="w-full flex flex-col items-center sm:gap-5 gap-2 px-5">
      <Helmet>
        <title>Update Asset | HR | HR3 Managements</title>
      </Helmet>
      <div className="flex flex-col items-center sm:mt-10 mt-5">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Update Asset
        </h2>
        <p className="sm:text-lg font-medium text-emerald-600 mt-2">
          Update asset details as needed.
        </p>
      </div>
      <Divider orientation="horizontal" variant="middle" flexItem></Divider>
      <div className="flex flex-col gap-4 lg:w-3/5 md:w-8/12 sm:w-10/12 ">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-4 mt-4 w-full"
        >
          <div className="flex md:flex-nowrap flex-wrap items-center gap-4">
            <TextField
              name="name"
              className="w-full"
              type="text"
              label="Name"
              variant="outlined"
              value={updateAsset.name || "name"}
              onChange={(e) => {
                setUpdateAsset((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            ></TextField>
            <TextField
              name="quantity"
              className="w-full"
              type="number"
              label="Quantity"
              variant="outlined"
              value={updateAsset.quantity || 1}
              onChange={(e) => {
                setUpdateAsset((prev) => ({
                  ...prev,
                  quantity: e.target.value,
                }));
              }}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            ></TextField>
          </div>
          <div className="w-full flex flex-col items-start text-left">
            <p className="text-lg font-semibold text-left">Type:</p>
            <Select
              name="type"
              id="type"
              className="w-full"
              value={
                updateAsset.type == "returnable"
                  ? "returnable"
                  : "non-returnable"
              }
              variant="outlined"
              onChange={(e) => {
                setUpdateAsset((prev) => ({
                  ...prev,
                  type: e.target.value,
                }));
              }}
            >
              <MenuItem value="returnable">Returnable</MenuItem>
              <MenuItem value="non-returnable">Non-Returnable</MenuItem>
            </Select>
          </div>
          <div className="w-full flex flex-col items-center">
            <button className="w-full md:w-1/2 mx-auto py-2 font-semibold rounded-lg border-2 text-white shadow-gray-400 bg-gradient-to-tr from-emerald-600 to-orange-400 transition hover:shadow-lg hover:from-emerald-700 hover:to-orange-500">
              <p className="text-lg font-semibold py-1">Update Asset</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HRUpdateAsset;
