import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRefreshtoken from "../../hooks/useRefreshToken";

function PersistanceLogin() {
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshtoken();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (!auth?.accessToken) {
      verifyRefreshToken();
    } else {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    console.log(auth?.accessToken);
    console.log(loading);
  }, [loading]);
  return <>{loading ? <p>Loading...</p> : <Outlet />}</>;
}

export default PersistanceLogin;
