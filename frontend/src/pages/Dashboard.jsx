import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { clearAccessToken } from "../api/tokenStore";

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    user,
    setUser,
    setAccessToken,
  } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get(
          "/users/profile"
        );

        setProfile(response.data.user);
      } catch (error) {
        console.log(
          error.response?.data?.message
        );
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      clearAccessToken();

      setAccessToken(null);
      setUser(null);

      navigate("/login");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>
        Welcome, {user?.name}
      </h2>

      <p>
        Email: {user?.email}
      </p>

      <hr />

      <h3>Profile From Protected API</h3>

      {profile && (
        <div>
          <p>
            User ID: {profile.id}
          </p>

          <p>
            Email: {profile.email}
          </p>
        </div>
      )}

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;