import axios from "axios";
import GlobalFunction from "./GlobalFunction";

export const axiosInstance = axios.create({});
// Add a request interceptor
axiosInstance.interceptors.request.use(
  // console.log("interceptor"),
  function (config) {
    // const token = localStorage.getItem("token");
    const items = JSON.parse(localStorage.getItem("items"));
    if (items?.token) {
      config.headers["Authorization"] = `Bearer ${items.token}`;
    }
    // console.log(token);
    // if (token !== null) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      GlobalFunction.logout();
    } else if (error.response.status === 500) {
      window.location.href = window.location.origin + "/error-500";
      console.log(window.location.origin + "/error-500");
    }
    return Promise.reject(error);
  }
);
