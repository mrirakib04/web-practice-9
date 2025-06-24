import { Divider, MenuItem, Select, TextField } from "@mui/material";
import { useContext } from "react";
import { UserMainContext } from "../../Context/UserContext";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

const HRAddAsset = () => {
  const { user } = useContext(UserMainContext);
  const AxiosSecure = useAxiosPrivate();

  // dynamic navbar control
  const { data: hr = {} } = useQuery({
    queryKey: ["userForNav"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
    retry: 3,
    retryDelay: 2000,
  });

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

  // form submit functionality
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name.value;
    const quantity = parseInt(target.quantity.value);
    const type = target.type.value;
    const date = getCurrentDateTime();
    const owner = user.email;
    const companyName = hr.companyName;
    console.log(name, quantity, type, date, owner, companyName);
    if (quantity > 0) {
      const asset = { name, quantity, type, date, owner, companyName };
      const postRes = await AxiosSecure.post("/assets", asset);

      console.log(postRes.status);
      if (postRes.status === 200) {
        console.log(postRes);
        Swal.fire({
          title: "Added!",
          text: `${quantity} ${name}s added for your employees.`,
          icon: "success",
        });
        target.reset();
      }
    } else {
      toast.info(`Quantity should be minimum 1`, {
        position: "top-right",
        autoClose: 2000,
        closeButton: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center sm:gap-5 gap-2 px-5">
      <Helmet>
        <title>Add Asset | HR | HR3 Managements</title>
      </Helmet>
      <div className="flex flex-col items-center sm:mt-10 mt-5">
        <h2 className="lg:text-4xl sm:text-3xl text-2xl font-semibold">
          Add Asset
        </h2>
        <p className="sm:text-lg font-medium text-emerald-600 mt-2">
          Add assets for your employees.
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
              required
            ></TextField>
            <TextField
              name="quantity"
              className="w-full"
              type="number"
              label="Quantity"
              variant="outlined"
              required
            ></TextField>
          </div>
          <div className="w-full flex flex-col items-start text-left">
            <p className="text-lg font-semibold text-left">Type:</p>
            <Select
              name="type"
              id="type"
              className="w-full"
              defaultValue={"returnable"}
              variant="outlined"
            >
              <MenuItem value="returnable">Returnable</MenuItem>
              <MenuItem value="non-returnable">Non-Returnable</MenuItem>
            </Select>
          </div>
          <div className="w-full flex flex-col items-center">
            <button className="w-full md:w-1/2 mx-auto py-2 font-semibold rounded-lg border-2 text-white shadow-gray-400 bg-gradient-to-tr from-purple-600 to-teal-400 transition hover:shadow-lg hover:from-purple-700 hover:to-teal-500">
              <p className="text-lg font-semibold py-1">Add Asset</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HRAddAsset;
