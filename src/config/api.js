import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://campus-sathi-server.onrender.com/api/v1";

export default BASE_URL;

// Authenticated axios instance for protected routes
export const authAxios = axios.create({ baseURL: BASE_URL });

authAxios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
