import { useGoogleLogin, type CodeResponse } from "@react-oauth/google";
import { useEffect, useState, type ChangeEvent } from "react";
import ErrorAlert from "../components/common/ErrorAlert";
import { useNavigate } from "react-router-dom";
import { instance } from "../instances/baseUrl";
import useAuth from "../hooks/useAuth";
import {
  toasterFailureFunction,
  toasterSuccessFunction,
} from "../helpers/toastHelper";

function Login() {
  const [error, setError] = useState("");
  const { auth, setAuth } = useAuth();
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  // Function to handle successful Google login
  const handleSuccess = async (authResult: CodeResponse) => {
    try {
      if (authResult["code"]) {
        const result = await instance.post("/user/login", {
          code: authResult["code"],
        });
        const { mobile, name, accessToken } = result.data;
        setAuth({ mobile, name, accessToken });
        toasterSuccessFunction("Login successfull.");
        navigate("/dashboard");
      } else {
        throw new Error("Missing auth code");
      }
    } catch {
      setError("Failed to login with google.");
      toasterFailureFunction("Failed to login.");
    }
  };
  // Function to handle Google login error
  const handleError = () => {
    setError("Something went wrong during Google login. Please try again.");
  };
  // Initialize Google login with required scopes and callbacks
  const googleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar.readonly",
  });
  // Redirect to dashboard if already logged in
  useEffect(() => {
    const checkFunction = async () => {
      if (auth?.accessToken) {
        navigate("/dashboard");
      }
    };
    checkFunction();
  }, []);
  // Load the 'persist' value from localStorage when component mounts(handling persistent login)
  useEffect(() => {
    const persist = localStorage.getItem("persist");
    if (!persist) {
      localStorage.setItem("persist", "true");
    } else {
      setRememberMe(JSON.parse(persist));
    }
  }, []);
  // Handler for "Remember Me" checkbox change
  const changedPersist = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("persist", e.target.checked?.toString());
    setRememberMe(e.target.checked);
  };
  return (
    <div className="min-w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="grid grid-cols-2 md:w-2/3 min-h-screen border-2 rounded shadow-lg bg-white">
        {/* Left Panel */}
        <div className="bg-[#002435] text-white md:flex flex-col gap-6 items-center justify-center hidden">
          <h3 className="text-2xl font-bold">Again Welcome Back</h3>
          <p className="text-lg">Sign in to continue to your account</p>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-6 items-center justify-center p-8 md:col-span-1 col-span-2">
          {error && <ErrorAlert setError={setError}>{error}</ErrorAlert>}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => changedPersist(e)}
              className="accent-blue-600 w-4 h-4 cursor-pointer"
            />
            Remember Me
          </label>
          {/* Google Login Button */}
          <div
            className="border border-gray-400 rounded p-3 font-semibold flex flex-row gap-3 items-center cursor-pointer hover:bg-gray-100 transition"
            onClick={googleLogin}
          >
            <img
              src="/images/google-logo.png"
              alt="Google"
              className="w-6 h-6"
            />
            <p className="text-sm sm:text-base">Continue with Google</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
