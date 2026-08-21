import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setUser, setAccessToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      setAccessToken(response.data.accessToken);
      setUser(response.data.user);

      console.log("Login successful");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;