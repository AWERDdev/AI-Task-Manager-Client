import { useState, useEffect } from "react";
import config from '../Config';

/**
 * Custom hook to fetch and manage user data
 * @returns {Object} User data and loading state
 */
export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${config.nodeApiUrl}/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setUser(data.user);
        if (config.enableDebugMode) {
          console.log("Fetched user data:", data.user);
        }
      } else {
        setError(data.message || "Failed to fetch user data");
        if (config.enableDebugMode) {
          console.error("Error fetching user:", data.message);
        }
      }
    } catch (error) {
      setError("Network error");
      if (config.enableDebugMode) {
        console.error("Fetch error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to log out the user
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Also remove user data from localStorage
    setUser(null);
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    user,
    loading,
    error,
    fetchUserData,
    logoutUser
  };
};
