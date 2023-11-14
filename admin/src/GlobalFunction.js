const GlobalFunction = {
  logout: () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("email");
    // localStorage.removeItem("name");
    // localStorage.removeItem("photo");
    // localStorage.removeItem("phone");
    localStorage.removeItem("items");
    window.location.href = window.location.origin;
  },
};

export default GlobalFunction;
