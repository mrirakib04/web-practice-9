import PropTypes from "prop-types";
import { UserMainContext } from "../../Context/UserContext";
import { useContext } from "react";
import { DNA } from "react-loader-spinner";
import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const IsEmployee = ({ children }) => {
  const { user, loading } = useContext(UserMainContext);
  const AxiosPublic = useAxiosPublic();

  const { data: employeeCheckPoint = [], isLoading } = useQuery({
    queryKey: ["employeeCheckPoint"],
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
  if (user && employeeCheckPoint.role?.toLowerCase() === "employee") {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

IsEmployee.propTypes = {
  children: PropTypes.node.isRequired,
};
export default IsEmployee;
