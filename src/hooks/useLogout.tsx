import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { toasterFailureFunction } from "../helpers/toastHelper";

// Custom hook to handle user logout by clearing auth state and navigating to login.

function useLogout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const signout = async () => {
    try {
      await axiosPrivate.get("/user/logout");
      setAuth(null);
      navigate("/login");
    } catch {
      toasterFailureFunction("Failed to login.");
    }
  };
  return signout;
}

export default useLogout;
