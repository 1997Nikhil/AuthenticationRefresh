import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import {
  useAuth,
} from "../context/AuthContext";

import {
  clearAccessToken,
} from "../api/tokenStore";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    user,
    setUser,
    setAccessToken,
  } = useAuth();

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response =
          await api.get(
            "/users/profile"
          );

        setProfile(
          response.data.user
        );
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
      await api.post(
        "/auth/logout"
      );
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
    return (
      <div className="loading">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          JWT Auth
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </nav>

      {/* Content */}
      <main className="dashboard-content">

        <section className="welcome-section">
          <h1>
            Welcome, {user?.name} 👋
          </h1>

          <p>
            You are successfully authenticated.
          </p>
        </section>

        <div className="dashboard-grid">

          {/* Profile Card */}
          <div className="dashboard-card">

            <h3>
              Your Profile
            </h3>

            <div className="profile-item">
              <span className="profile-label">
                Name
              </span>

              <span className="profile-value">
                {user?.name}
              </span>
            </div>

            <div className="profile-item">
              <span className="profile-label">
                Email
              </span>

              <span className="profile-value">
                {user?.email}
              </span>
            </div>

            <div className="profile-item">
              <span className="profile-label">
                User ID
              </span>

              <span className="profile-value">
                {user?.id}
              </span>
            </div>

          </div>

          {/* Authentication Status */}
          <div className="dashboard-card">

            <h3>
              Authentication
            </h3>

            <div className="status-card">

              <div className="status-icon">
                ✓
              </div>

              <div className="status-text">

                <h4>
                  Authenticated
                </h4>

                <p>
                  Your access token is active.
                </p>

              </div>

            </div>

          </div>

          {/* Protected API */}
          <div className="dashboard-card">

            <h3>
              Protected API
            </h3>

            {profile && (
              <>
                <div className="profile-item">
                  <span className="profile-label">
                    API User ID
                  </span>

                  <span className="profile-value">
                    {profile.id}
                  </span>
                </div>

                <div className="profile-item">
                  <span className="profile-label">
                    API Email
                  </span>

                  <span className="profile-value">
                    {profile.email}
                  </span>
                </div>
              </>
            )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;