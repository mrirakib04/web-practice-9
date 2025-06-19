import { useContext } from "react";
import { DNA } from "react-loader-spinner";
import { UserMainContext } from "../../Context/UserContext";
import PropTypes from "prop-types";
import { Navigate } from "react-router";

const IsLogin = ({ children }) => {
  const { user, loading } = useContext(UserMainContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <DNA></DNA>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

IsLogin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsLogin;
