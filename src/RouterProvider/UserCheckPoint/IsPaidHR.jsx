import { useContext } from "react";
import { UserMainContext } from "../../Context/UserContext";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";
import { Navigate } from "react-router";
import PropTypes from "prop-types";

const IsPaidHR = ({ children }) => {
  const { user, loading } = useContext(UserMainContext);
  const AxiosPublic = useAxiosPublic();

  const { data: PayCheckPoint = [], isLoading } = useQuery({
    queryKey: ["PayCheckPoint"],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/hr/${user.email}`);
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
  if (user && PayCheckPoint.paymentStatus === "paid") {
    return children;
  }

  return <Navigate to="/hr/payment"></Navigate>;
};

IsPaidHR.propTypes = {
  children: PropTypes.node.isRequired,
};
export default IsPaidHR;
