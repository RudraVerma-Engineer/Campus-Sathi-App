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
        if (storedToken) {
          setToken(storedToken);
          await fetchUserProfile(storedToken);
        }
      } catch (err) {
        console.error("Session restore error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  // fetch user profile from backend
  const fetchUserProfile = async (authToken) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/profile`, {
        header: { Authorization: `Bearer ${authToken}` },
      });
      setUser(response.data.user);
    } catch (err) {
      console.error("Fetch profile error:", err.message);
      // Token expired or invalid - clear everything
      await logout();
    }
  };

  // Login : save token + load user

  const login = async (responseData) => {
    try {
      const { token: newToken, user: userData } = responseData;

      await AsyncStorage.setItem("token", newToken);

      setToken(newToken);

      //if backend returns user directly in login response, use it
      if (userData) {
        setUser(userData);
      } else {
        //otherwise fetch it separately
        await fetchUserProfile(newToken);
      }
    } catch (err) {
      console.error("Login context error:", err);
    }
  };

  //logout: clear everything
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // update user locally (e.g. after profile edit)
  const updateUser = (updateFields) => {
    setUser((prev) => ({ ...prev, ...updateFields }));
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// custom hook use this in every screen
export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}