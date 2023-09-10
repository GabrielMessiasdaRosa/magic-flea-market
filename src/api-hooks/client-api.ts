import axios from "axios";

const clientApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default clientApi;
