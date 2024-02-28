import axios from "axios";

const url = "http://localhost:3001/api";

export const AxiosInstance = axios.create({
    baseURL: url,
  });