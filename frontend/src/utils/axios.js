import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://api.daily24.click/app" || "http://localhost:8090/app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
