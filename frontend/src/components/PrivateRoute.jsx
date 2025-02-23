import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = ({ role }) => {
  const { isAuthenticated, checkingStatus, userRole } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />; // Redirect if role doesn't match
  }

  return <Outlet />;
};

export default PrivateRoute;
