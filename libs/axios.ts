import axios from "axios";
import { getCookies } from "@/utils";

const BASE_URL = process.env.NEXT_PUBLIC_BE_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${getCookies(
  "access_token"
)}`;

export default axiosInstance;
