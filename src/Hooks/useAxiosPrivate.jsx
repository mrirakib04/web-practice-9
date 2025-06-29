import axios from "axios";
import { useContext, useEffect } from "react";
import { UserMainContext } from "../Context/UserContext";
import { useNavigate } from "react-router";

const AxiosSecure = axios.create({
  baseURL: "https://mrirakib04-server-3.vercel.app/",
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(UserMainContext);

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = AxiosSecure.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        console.error("Axios request error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = AxiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response) {
          const status = error.response.status;

          // Handle unauthorized or forbidden responses
          if (status === 401 || status === 403) {
            try {
              await handleLogout();
              navigate("/login");
            } catch (logoutError) {
              console.error("Logout failed:", logoutError);
            }
          }
        } else {
          console.error("Network or server error:", error.message);
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount (optional)
    return () => {
      AxiosSecure.interceptors.request.eject(requestInterceptor);
      AxiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, handleLogout]);

  return AxiosSecure;
};

export default useAxiosPrivate;
