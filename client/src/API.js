import axios from "axios";

const url = "https://pocket-notes-ckef.onrender.com/api";

export const AxiosInstance = axios.create({
    baseURL: url,
  });