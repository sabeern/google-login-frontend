import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRefreshtoken from "../../hooks/useRefreshToken";
import { RingLoader } from "react-spinners";
import useLogout from "../../hooks/useLogout";

function PersistanceLogin() {
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const signout = useLogout();
  const refresh = useRefreshtoken();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // Create a new access token for persistent login if a refresh token is available.
        await refresh();
      } catch {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    };
    const persist = localStorage.getItem("persist");
    // If "persist" is enabled and there's no access token, try refreshing
    if (persist == "true" && !auth?.accessToken) {
      verifyRefreshToken();
    } else {
      //if persist is disabled, then user refresh logout and remove jwt from cookie
      signout();
      setLoading(false);
    }
  }, []);
  return (
    <>
      {loading ? (
        <div className="min-h-screen w-full flex items-center justify-center">
          <RingLoader color="#2563eb" size={80} />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default PersistanceLogin;
