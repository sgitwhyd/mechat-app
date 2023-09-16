/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const putToCookie = (key: string, value: any) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);

  const options = {
    path: "/",
    expires: expirationDate,
  };
  cookies.set(key, value, options);
};

export const getCookies = (key: string) => {
  return cookies.get(key);
};

export const putToLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
