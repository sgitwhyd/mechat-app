import axios from "axios";
import { getCookies } from ".";

const BASE_URL = process.env.NEXT_API_BE_BASE_URL;
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.defaults.headers.common["Authorization"] = `Bearer ${getCookies(
  "access_token"
)}`;
