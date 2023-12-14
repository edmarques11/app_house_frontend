import axios, { type AxiosInstance } from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.public.apiBaseUrl,
    timeout: 30000,
    timeoutErrorMessage: "Tempo limite de responsta esgotado",
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response?.data;
    },
    (error) => {
      if (error?.response?.code === 401) {
        nuxtApp.$logout();
      }
      return Promise.reject(error?.response?.data);
    },
  );

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
