import axios from "axios";
import GlobalFunction from "./GlobalFunction";
import GetLocalStorageItem from "../src/components/utils/GetLocalStorageItem";

export const axiosInstance = axios.create({});
axiosInstance.interceptors.request.use(
  function (config) {
    const token = GetLocalStorageItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("From axios interceptor", error.response);
    if (error.response.status === 401) {
      GlobalFunction.logout();
    } else if (error.response.status === 500) {
      window.location.href = window.location.origin + "/error-500";
      console.log(window.location.origin + "/error-500");
    }
    return Promise.reject(error);
  }
);
