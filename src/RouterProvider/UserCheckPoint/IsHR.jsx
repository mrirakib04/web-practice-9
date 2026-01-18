import { useContext } from "react";
import { UserMainContext } from "../../Context/UserContext";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";
import { Navigate } from "react-router";
import PropTypes from "prop-types";

const IsHR = ({ children }) => {
  const { user, loading } = useContext(UserMainContext);
  const AxiosPublic = useAxiosPublic();

  const { data: hrCheckPoint = [], isLoading } = useQuery({
    queryKey: ["hrCheckPoint"],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/user/${user.email}`);
      return res.data;
    },
  });

  if ((loading, isLoading)) {
    return (
      <div className="flex items-center justify-center py-20">
        <DNA></DNA>
      </div>
    );
  }
  if (user && hrCheckPoint.role?.toLowerCase() === "hr") {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

IsHR.propTypes = {
  children: PropTypes.node.isRequired,
};
export default IsHR;
