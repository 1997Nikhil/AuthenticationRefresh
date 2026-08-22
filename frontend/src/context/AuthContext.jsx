import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";
import {
  setAccessToken as storeAccessToken,
  clearAccessToken,
} from "../api/tokenStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [accessToken, setAccessTokenState] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const setAccessToken = (token) => {
    storeAccessToken(token);
    setAccessTokenState(token);
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await api.post(
          "/auth/refresh"
        );

        const token =
          response.data.accessToken;

        setAccessToken(token);

        const profileResponse =
          await api.get(
            "/users/profile"
          );

        setUser(
          profileResponse.data.user
        );
      } catch (error) {
        clearAccessToken();

        setAccessTokenState(null);
        setUser(null);
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
        setAccessToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};