import axios from "axios";
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from "./localstorage";

// Create axios instance
export const Axiosclient = axios.create({
  baseURL: "http://localhost:5349",
  withCredentials: true,
});

// Request interceptor
Axiosclient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  if (accessToken) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return request;
});

// Token refresh handler
const refreshToken = async (originalRequest) => {
  try {
    const response = await Axiosclient.get("/auth/refresh");
    if (response.data.status === "ok") {
      const newAccessToken = response.data.result.accessToken;
      setItem(KEY_ACCESS_TOKEN, newAccessToken);

      // Update original request with new access token
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return axios(originalRequest); // Retry the original request
    } else {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login");
      return Promise.reject("Failed to refresh token");
    }
  } catch (error) {
    removeItem(KEY_ACCESS_TOKEN);
    window.location.replace("/login");
    return Promise.reject(error);
  }
};

// Response interceptor
Axiosclient.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.status === "ok") {
      return data;
    }

    const statusCode = data.statusCode;
    const originalRequest = response.config;
    const error = data.error;

    if (statusCode === 401 && originalRequest.url === "/auth/refresh") {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login");
      return Promise.reject(error);
    }

    if (statusCode === 401) {
      return refreshToken(originalRequest); // Handle token refresh
    }

    return Promise.reject(error);
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the Axiosclient instance for use in other files
export default Axiosclient;
