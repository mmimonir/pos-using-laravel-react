const GlobalFunction = {
  logout() {
    // localStorage.removeItem("token");
    // localStorage.removeItem("email");
    // localStorage.removeItem("name");
    // localStorage.removeItem("photo");
    // localStorage.removeItem("phone");
    localStorage.removeItem("items");
    window.location.href = window.location.origin;
  },
  isAdmin() {
    if (localStorage.getItem("items") !== null) {
      const items = JSON.parse(localStorage.getItem("items"));
      if (items.role === 1) {
        return true;
      }
      return false;
    }
  },
};

export default GlobalFunction;
