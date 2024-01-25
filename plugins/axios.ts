import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const cookieAuth = useCookie("authorization");

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.public.apiBaseUrl,
    timeout: 30000,
    timeoutErrorMessage: "Tempo limite de responsta esgotado",
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (
      config: InternalAxiosRequestConfig<any>,
    ):
      | InternalAxiosRequestConfig<any>
      | Promise<InternalAxiosRequestConfig<any>> => {
      config.headers.Authorization = cookieAuth.value;

      return config;
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response?.data;
    },
    (error) => {
      if (error?.response?.status === 401) {
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
