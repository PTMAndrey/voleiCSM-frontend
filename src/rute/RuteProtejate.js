import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RuteProtejate = ({ role }) => {
  let location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RuteProtejate;
