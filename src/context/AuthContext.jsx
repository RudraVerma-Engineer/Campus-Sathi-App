import { useContext, useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import BASE_URL from "../config/api.js";

// create context

const AuthContext = createContext(null);

// provider

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // full user object from backend
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true while checking storsge on app start

  // on app lauch : restore token + fetch user
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (!storedToken) {
          return;
        }

        setToken(storedToken);

        await fetchUserProfile(storedToken);
      } catch (err) {
        console.error("Session restore error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  // fetch authenticated user's profile from backend

  const fetchUserProfile = async (authToken) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.data?.user) {
        setUser(response.data.user);
      } else {
        throw new Error("Invalid profile response from server");
      }
    } catch (err) {
      console.error(
        "Fetch profile error:",
        err.response?.data?.message || err.message,
      );
      // Token expired or invalid.
      // Clear local session without making another backend request.
      await clearLocalSession();

      throw err;
    }
  };

  // Login : save token + load user

  const login = async (responseData) => {
    try {
      const newToken = responseData?.token;
      const userData = responseData?.user;

      if (!newToken) {
        throw new Error("Authentication token was not returned by server");
      }

      // Save token permanently
      await AsyncStorage.setItem("token", newToken);

      // Update React state
      setToken(newToken);

      // If backend already returned user data,
      // don't make another API request.
      if (userData) {
        setUser(userData);
      } else {
        //otherwise fetch the authenticated profile.
        await fetchUserProfile(newToken);
      }
      return {
        success: true,
        user: userData || null,
      };
    } catch (err) {
      console.error(
        "Login context error:",
        err.response?.data?.message || err.message,
      );

      // If login/context setup fails, don't leave
      // a potentially invalid token stored.
      await clearLocalSession();

      throw err;
    }
  };

  // Clear local authentication state

  const clearLocalSession = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (err) {
      console.error("Clear local session error:", err);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  //logout: clear everything
  const logout = async () => {
    try {
      // If we have a token, tell the backend about logout.
      if (token) {
        try {
          await axios.post(
            `${BASE_URL}/auth/logout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } catch (err) {
          // Even if backend logout fails, local logout
          // must still happen.
          console.warn(
            "Backend logout failed:",
            err.response?.data?.message || err.message,
          );
        }
      }
    } finally {
      await clearLocalSession();
    }
  };

  // update user locally (e.g. after profile edit)
  const updateUser = (updateFields) => {
    setUser((previousUser) => {
      if (!previousUser) {
        return previousUser;
      }

      return {
        ...previousUser,
        ...updateFields,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        updateUser,
        fetchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// custom hook use this in every screen
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}
