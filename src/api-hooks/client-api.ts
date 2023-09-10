import axios from "axios";

const clientApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
});

export default clientApi;
