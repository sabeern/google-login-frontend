import { instance } from "../instances/baseUrl";
import useAuth from "./useAuth";

// Custom hook to refresh the access token using a stored refresh token.

function useRefreshtoken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const result = await instance.get("/user/refresh", {
        withCredentials: true,
      });
      const { accessToken, name, mobile } = result.data;
      setAuth({ accessToken, name, mobile });
      return result?.data?.accessToken;
    } catch {
      // console.log(err);
    }
  };
  return refresh;
}

export default useRefreshtoken;
