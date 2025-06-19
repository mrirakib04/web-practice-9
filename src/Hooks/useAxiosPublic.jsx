import axios from "axios";

const AxiosPublic = axios.create({
  baseURL: "https://mrirakib04-server-3.vercel.app/",
});

const useAxiosPublic = () => {
  return AxiosPublic;
};

export default useAxiosPublic;
