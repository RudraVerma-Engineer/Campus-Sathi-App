import axios from "axios";
import BASE_URL from "../config/api.js";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const registerUser = async (formDataObj) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/register`,
      formDataObj,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || // ← "User already exists" from backend
      error.message || // ← fallback network errors
      "Something went wrong";
    throw new Error(message); // ← always a proper Error instance
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

// If your backend has a dedicated resend endpoint, update the URL below
export const resendOTP = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/resend-otp`, {
      email,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    throw new Error(message);
  }
};