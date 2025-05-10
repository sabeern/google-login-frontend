import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// This component is used to protect routes that require the user to be authenticated.

function RequireAuth() {
  const location = useLocation();
  const { auth } = useAuth();
  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
