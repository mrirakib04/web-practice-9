import axios from "axios";
import { useContext } from "react";
import { UserMainContext } from "../Context/UserContext";
import { useNavigate } from "react-router";

const AxiosSecure = axios.create({
  baseURL: "https://mrirakib04-server-3.vercel.app/",
});

const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(UserMainContext);

  // request interceptor to add authorization header for every secure call to teh api
  AxiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("jwt");
      // console.log('request stopped by interceptors', token)
      config.headers.authorization = `${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status
  AxiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await handleLogout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return AxiosSecure;
};

export default useAxiosPrivate;
