const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1337"
    : import.meta.env.VITE_REACT_BASE_URL;

export const wordleVoteeApiUrl =
  import.meta.env.VITE_REACT_WORDLE_VOTEE_URL ||
  "https://wordle.votee.dev:8000";

export default apiUrl;
