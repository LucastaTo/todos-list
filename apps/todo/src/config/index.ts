const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5174/api"
    : import.meta.env.VITE_REACT_BASE_URL + "/api";

export default apiUrl;
