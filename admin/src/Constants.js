const Constants = {
  // BASE_URL: "http://localhost:8001/api",
  // BASE_URL: "http://localhost:8000/api",
  BASE_URL:
    window.location.hostname == "localhost"
      ? "http://localhost:8000/api"
      : "https://api.bajajpoint.xyz/api",
};

export default Constants;
