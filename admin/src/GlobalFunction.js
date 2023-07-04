const GlobalFunction = {
  logout: () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("email");
    // localStorage.removeItem("name");
    // localStorage.removeItem("photo");
    // localStorage.removeItem("phone");
    localStorage.removeItem("items");
  },
};

export default GlobalFunction;
