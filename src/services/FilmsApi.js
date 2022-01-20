import axios from "axios";

export const FilmsService = axios.create({
  baseURL: process.env.REACT_APP_FILMS_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default FilmsService;