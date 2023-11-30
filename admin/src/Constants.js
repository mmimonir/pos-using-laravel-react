const detectOS = () => {
  const { userAgent } = window.navigator;
  let os = "Unknown OS";
  if (userAgent.indexOf("Win") > -1) os = "Windows";
  if (userAgent.indexOf("Linux") > -1) os = "Linux";
  return os;
};

const defineBaseURL = () => {
  let baseURL = "http://localhost:8000/api";

  if (detectOS() === "Windows") {
    baseURL = "http://localhost:8000/api";
  } else if (detectOS() === "Linux") {
    baseURL = "http://localhost:8001/api";
  } else {
    baseURL = "https://api.bajajpoint.xyz/api";
  }
  return baseURL;
};
const Constants = {
  // BASE_URL: "http://localhost:8001/api",
  // BASE_URL: "http://localhost:8000/api",
  // BASE_URL: window.location.hostname == "localhost" ? "http://localhost:8000/api": "https://api.bajajpoint.xyz/api",
  BASE_URL: defineBaseURL(),
};

export default Constants;
