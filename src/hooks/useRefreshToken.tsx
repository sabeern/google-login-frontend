import { instance } from "../instances/baseUrl";
import useAuth from "./useAuth";

function useRefreshtoken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const result = await instance.get("/user/refresh", {
        withCredentials: true,
      });
      console.log(result.data);
      const { accessToken, name, mobile } = result.data;
      setAuth({ accessToken, name, mobile });
      return result?.data?.accessToken;
    } catch (err) {
      console.log(err);
    }
  };
  return refresh;
}

export default useRefreshtoken;
