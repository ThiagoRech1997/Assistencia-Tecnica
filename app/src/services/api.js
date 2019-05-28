import axios from "axios";

const api = axios.create({
    baseURL: "http://172.27.8.225:3050"
});

export default api;