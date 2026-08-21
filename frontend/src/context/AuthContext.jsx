import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";
import { setAccessToken as storeAccessToken } from "../api/tokenStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await api.post("/auth/refresh");

        const token = response.data.accessToken;

        storeAccessToken(token);
        setAccessToken(token);

        const userResponse = await api.get(
          "/users/profile"
        );

        setUser(userResponse.data.user);
      } catch (error) {
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken: (token) => {
          storeAccessToken(token);
          setAccessToken(token);
        },
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);