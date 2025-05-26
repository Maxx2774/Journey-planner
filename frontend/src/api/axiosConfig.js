import axios from "axios";
axios.defaults.withCredentials = true;
const apiClient = axios.create({ baseURL: "http://localhost:3000/api" });

export default apiClient;
