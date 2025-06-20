import { useQuery } from "@tanstack/react-query";
import { Divider, InputAdornment, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { UserMainContext } from "../Context/UserContext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const image_API = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOSTING_API
}`;
const JoinAsEmployee = () => {
  const [showPassword, setShowPassword] = useState(false);
  const AxiosPublic = useAxiosPublic();
  const {
    handleRegisterEmailPassword,
    setUser,
    setName,
    setImage,
    handleGoogle,
  } = useContext(UserMainContext);

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
    let image = target.image.files[0];
    const password = target.password.value;
    const birth = target.birth.value;
    const role = "Employee";

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

    const imgFile = { image };
    const res = await AxiosPublic.post(image_API, imgFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.data.url) {
      image = res.data.data.url;
      const userData = { name, email, image, birth, role };
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
          AxiosPublic.post("/unemployed", userData)
            .then((res) => {
              console.log("post in unemployed collection res", res);
            })
            .catch((error) => {
              console.log("post in unemployed collection err", error);
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
    } else {
      console.log(res);
      toast.warn(
        `Something went wrong with image upload.
        Please try leter.`,
        {
          position: "top-right",
          autoClose: 4000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
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
            role: "employee",
          };

          AxiosPublic.post("/users", userData)
            .then((res) => {
              console.log("post in users collection res", res);
            })
            .catch((error) => {
              console.log("post in users collection err", error);
            });
          AxiosPublic.post("/unemployed", userData)
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
      <div className="flex flex-col gap-1 items-center md:mt-8 mt-4">
        <h3 className="md:text-3xl text-2xl italic font-medium">
          Join As Employee
        </h3>
        <p className="text-base font-medium text-orange-500">
          Get hired by HR Officers
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
              name="email"
              className="w-full"
              type="email"
              label="Email"
              variant="outlined"
              autoComplete="username"
              required
            ></TextField>
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
          <div className="w-full flex flex-col items-center">
            <button className="w-full md:w-1/2 mx-auto py-2 text-xl font-semibold rounded-lg border-2 text-black shadow-gray-400 bg-gradient-to-tr from-purple-300 to-cyan-300 transition hover:shadow-lg">
              <p className="text-lg font-semibold py-1">Register As Employee</p>
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

export default JoinAsEmployee;
