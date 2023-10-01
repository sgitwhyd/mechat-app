/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "universal-cookie";
import moment from "moment";

const cookies = new Cookies();

const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 1);
const cookiesOptions = {
  path: "/",
  expires: expirationDate,
};

export const putToCookie = (key: string, value: any) => {
  cookies.set(key, value, cookiesOptions);
};

export const removeCookie = (key: string) => {
  return cookies.remove(key, cookiesOptions);
};

export const getCookies = (key: string) => {
  return cookies.get(key);
};

export const putToLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const getFromLocalStorage = (key: string): any => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(key);
  }
};

export const formatDate = (date: string) => moment(date).format("llll");
