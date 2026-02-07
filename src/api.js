import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-backend-ehsan.onrender.com/api",
  withCredentials: true,
});

export default api;
