import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type ContextType = {
  auth: AuthType | null;
  setAuth: Dispatch<SetStateAction<AuthType | null>>;
};
type AuthType = {
  accessToken: string;
  name: string;
  mobile: string;
};
const AuthContext = createContext<null | ContextType>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<null | AuthType>(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
