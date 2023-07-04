const GetLocalStorageItem = (key) => {
  const item = JSON.parse(localStorage.getItem("items"));
  if (item?.[key]) {
    return item[key];
  }
  return null;
};

export default GetLocalStorageItem;
