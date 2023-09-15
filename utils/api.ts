import axios from "axios";
import { getCookies } from ".";

const BASE_URL = "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.defaults.headers.common["Authorization"] = `Bearer ${getCookies("token")}`;
