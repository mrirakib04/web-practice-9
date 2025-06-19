import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router";
import { UserMainContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Login = () => {
  const {
    handleGoogle,
    setUser,
    setImage,
    setName,
    setPhone,
    handleLoginEmailPassword,
  } = useContext(UserMainContext);

  const AxiosPublic = useAxiosPublic();

  // handle email login
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    handleLoginEmailPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        toast.success(`Login Successful`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        toast.error(`Login Error: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });

    console.log(email, password);
  };

  // handle google
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });
  const handleGoogleLogin = () => {
    handleGoogle()
      .then((result) => {
        setUser(result.user);
        setImage(result.user.photoURL);
        setName(result.user.displayName);
        setPhone(result.user.phoneNumber);
        toast.success(`Login Successful`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("user res", result.user);

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
        toast.error(`Login Error${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
  //   Dynamic Password Eye
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full px-4">
      <div className="py-5 px-4 flex flex-col gap-5 border-4 border-cyan-300 bg-white text-black rounded-xl lg:w-1/3 md:w-1/2 sm:w-2/3 mx-auto my-10 font-medium">
        <h3 className="text-3xl font-bold text-left">Login with:</h3>
        <button
          onClick={handleGoogleLogin}
          className="border-2 border-cyan-500 bg-white rounded-lg text-xl font-semibold py-2 flex items-center justify-center gap-2 text-black"
        >
          <FcGoogle className="text-2xl"></FcGoogle>
          Google
        </button>
        <p className="text-xl font-semibold text-center">or</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
          <input
            name="email"
            className="border shadow-md shadow-gray-400 placeholder:text-lg placeholder:font-semibold py-3 rounded-lg px-3"
            type="email"
            placeholder="Email"
            required
          />
          <div className="relative">
            <input
              name="password"
              className="w-full border shadow-md shadow-gray-400 placeholder:text-lg placeholder:font-semibold py-3 rounded-lg px-3"
              type={!showPassword ? "password" : "text"}
              placeholder="Password"
              required
            />
            {!showPassword ? (
              <IoMdEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-2xl"
              ></IoMdEye>
            ) : (
              <IoMdEyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-2xl"
              ></IoMdEyeOff>
            )}
          </div>

          <button className="w-full py-2 text-xl font-semibold rounded-lg border-2 text-black shadow-gray-400 bg-gradient-to-tr from-purple-300 to-cyan-300 transition hover:shadow-lg">
            <p className="text-lg font-semibold py-1">Login</p>
          </button>
        </form>
        <div className="sm:text-lg text-base font-normal flex flex-col items-start">
          <p>Don&apos;t have an account?&nbsp;</p>
          <Link
            className="font-bold text-xl hover:text-green-700 transition"
            to="/JoinAsEmployee"
          >
            Join As Employee
          </Link>
          or
          <Link
            className="font-bold text-xl hover:text-cyan-700 transition"
            to="/JoinAsHR"
          >
            Join As HR
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
