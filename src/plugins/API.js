import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
