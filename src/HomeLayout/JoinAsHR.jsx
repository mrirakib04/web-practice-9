import {
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { UserMainContext } from "../Context/UserContext";
import { updateProfile } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";

const image_API = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOSTING_API
}`;
const JoinAsHR = () => {
  const [showPassword, setShowPassword] = useState(false);
  const AxiosPublic = useAxiosPublic();
  const {
    handleRegisterEmailPassword,
    setUser,
    setName,
    setImage,
    handleGoogle,
  } = useContext(UserMainContext);

  // image hosting
  const hostUserImg = async (image) => {
    const userImgFile = { image };
    const userImgRes = await AxiosPublic.post(image_API, userImgFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return userImgRes.data.data.url;
  };
  const hostCompanyLogoImg = async (image) => {
    const companyLogoFile = { image };
    const companyLogoRes = await AxiosPublic.post(image_API, companyLogoFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return companyLogoRes.data.data.url;
  };

  // Password validation function
  const validatePassword = (password) => {
    // Example: Password must be at least 6 characters, contain a number, an uppercase letter, and a special character
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  // form submit functionality
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    const birth = target.birth.value;
    const imageFile = target.image.files[0];
    const companyName = target.companyName.value;
    const companyLogoFile = target.companyLogo.files[0];
    const packageName = target.package.value;
    const role = "hr";
    const paymentStatus = "unpaid";

    if (!validatePassword(password)) {
      toast.error(
        "Please add at least 6 characters, a Number, an Uppercase, a Lowercase letter and a special character in password.",
        {
          position: "top-right",
          autoClose: 4000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      return;
    }

    try {
      // Wait for the image uploads to complete
      const image = await hostUserImg(imageFile);
      const companyLogo = await hostCompanyLogoImg(companyLogoFile);
      if (image && companyLogo) {
        console.log(image, companyLogo);
        const userData = {
          name,
          email,
          birth,
          image,
          companyName,
          companyLogo,
          packageName,
          role,
          paymentStatus,
        };
        console.log("userData with img url", userData);

        handleRegisterEmailPassword(email, password)
          .then((userCredential) => {
            updateProfile(userCredential.user, {
              displayName: name,
              photoURL: image,
            });
            setUser(userCredential.user);
            setName(name);
            setImage(image);
            toast.success(`Registration Successful`, {
              position: "top-right",
              autoClose: 2000,
              closeButton: true,
              pauseOnHover: true,
              draggable: true,
            });

            AxiosPublic.post("/users", userData)
              .then((res) => {
                console.log("post in users collection res", res);
              })
              .catch((error) => {
                console.log("post in users collection err", error);
              });
            AxiosPublic.post("/hrs", userData)
              .then((res) => {
                console.log("post in hrs collection res", res);
              })
              .catch((error) => {
                console.log("post in hrs collection err", error);
              });
          })
          .catch((error) => {
            toast.error(`Register Error:${error}`, {
              position: "top-right",
              autoClose: 2000,
              closeButton: true,
              pauseOnHover: true,
              draggable: true,
            });
          });
      }
    } catch (error) {
      toast.error(`Error uploading images: ${error}`, {
        position: "top-right",
        autoClose: 2000,
        closeButton: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });
  // google registration
  const handleGoogleMethod = () => {
    handleGoogle()
      .then((result) => {
        setUser(result.user);
        setImage(result.user.photoURL);
        setName(result.user.displayName);
        toast.success(`Registration Successful`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log(result, result.user.email);

        const existingUser = users.find(
          (user) => user.email === result.user.email
        );
        if (!existingUser) {
          const userData = {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
            birth: null,
            companyName: "Default",
            companyLogo: "https://ibb.co.com/Ny2j27v",
            packageName: 10,
            role: "hr",
            paymentStatus: "unpaid",
          };

          AxiosPublic.post("/users", userData)
            .then((res) => {
              console.log("post in users collection res", res);
            })
            .catch((error) => {
              console.log("post in users collection err", error);
            });
          AxiosPublic.post("/hrs", userData)
            .then((res) => {
              console.log("post in unemployed collection res", res);
            })
            .catch((error) => {
              console.log("post in unemployed collection err", error);
            });
        } else {
          console.log("found same email");
        }
      })
      .catch((error) => {
        toast.error(`Google Register Error:${error.message}`, {
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
      <div className="flex flex-col gap-1 items-center text-center md:mt-8 mt-4">
        <h3 className="md:text-3xl text-2xl italic font-medium">Join As HR</h3>
        <div className="flex gap-1 flex-wrap items-center justify-center text-center text-base font-medium text-orange-500">
          Manage assets distribusion in{" "}
          <p className="text-cyan-600"> HR3 Managements</p>
        </div>
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
              name="email"
              className="w-full"
              type="email"
              label="Email"
              variant="outlined"
              required
              autoComplete="username"
            ></TextField>
          </div>
          <div className="flex md:flex-nowrap flex-wrap items-center gap-4">
            <div className="w-full relative">
              <TextField
                name="password"
                className="w-full"
                type={showPassword ? "text" : "password"}
                label="password"
                variant="outlined"
                autoComplete="current-password"
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  },
                }}
              />
              {!showPassword ? (
                <MdVisibility
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-4 right-3 text-2xl z-40"
                ></MdVisibility>
              ) : (
                <MdVisibilityOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-4 right-3 text-2xl z-40"
                ></MdVisibilityOff>
              )}
            </div>
            <TextField
              name="birth"
              className="w-full"
              type="date"
              label="Birth Date"
              variant="outlined"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <div className="flex items-center">
            <TextField
              name="image"
              className="w-full"
              type="file"
              label="Image"
              variant="outlined"
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
          <div className="flex md:flex-nowrap flex-wrap items-center gap-4">
            <TextField
              name="companyName"
              className="w-full"
              type="text"
              label="Company Name"
              variant="outlined"
              required
            ></TextField>
            <TextField
              name="companyLogo"
              className="w-full"
              type="file"
              label="Company Logo URL"
              variant="outlined"
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
            <p className="text-lg font-semibold text-left">Package:</p>
            <Select
              name="package"
              className="w-full"
              defaultValue={10}
              label="Package"
            >
              <MenuItem value={5}>Basic 5$</MenuItem>
              <MenuItem value={10}>Standard 10$</MenuItem>
              <MenuItem value={15}>Premium 15$</MenuItem>
            </Select>
          </div>
          <div className="w-full flex flex-col items-center">
            <button className="w-full md:w-1/2 mx-auto py-2 font-semibold rounded-lg border-2 text-white shadow-gray-400 bg-gradient-to-tr from-purple-600 to-green-400 transition hover:shadow-lg">
              <p className="text-lg font-semibold py-1">Register As HR</p>
            </button>
          </div>
        </form>

        <p className="text-xl font-bold text-center">or</p>
        <button
          onClick={handleGoogleMethod}
          className="w-full md:w-1/2 mx-auto border-2 border-cyan-500 bg-white rounded-lg text-xl font-semibold transition hover:shadow-lg hover:border-cyan-600 py-2 flex items-center justify-center gap-2 text-black"
        >
          <FcGoogle className="text-2xl"></FcGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default JoinAsHR;
