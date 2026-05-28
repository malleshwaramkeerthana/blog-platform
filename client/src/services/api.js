import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-platform-a23n.onrender.com/api",
});

export default API;