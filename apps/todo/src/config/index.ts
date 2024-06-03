const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5174"
    : import.meta.env.VITE_REACT_BASE_URL;

export default apiUrl;
