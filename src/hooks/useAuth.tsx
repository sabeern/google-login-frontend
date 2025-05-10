import { useContext } from "react";
import AuthContext from "../store/AuthContext";

// The useAuth custom hook provides easy access to authentication data and functions from the AuthContext.

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default useAuth;
