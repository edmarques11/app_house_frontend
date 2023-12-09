import axios, { type AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3333/api",
  timeout: 30000,
  timeoutErrorMessage: "Tempo limite de responsta esgotado",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  },
);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
