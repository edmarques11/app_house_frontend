import { defineStore } from "pinia";
import { alertStore } from "../alert";

type ErrorsType = {
  username: null | string;
  password: null | string;
  [key: string]: null | string;
};

function copyData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export const loginStore = defineStore("login", () => {
  const defaultDataError: ErrorsType = {
    username: null,
    password: null,
  };

  const dataError = ref<ErrorsType>(copyData<ErrorsType>(defaultDataError));
  const username = ref<string>("");
  const password = ref<string>("");

  const nuxtApp = useNuxtApp();
  const alert = alertStore();
  const router = useRouter();
  const cookie = useCookie("authorization", { secure: true });

  function setErrors(errors: string[]) {
    const keysErrors = Object.keys(dataError.value);

    keysErrors.forEach((key) => {
      dataError.value[key] =
        errors.find((e) => e.includes(key))?.replace(`${key}: `, "") || null;
    });
  }

  async function doLogin(): Promise<void> {
    try {
      const {
        data: { token },
      } = await nuxtApp.$axios.post("/login", {
        username: username.value,
        password: password.value,
      });

      cookie.value = "Bearer " + token;

      setErrors([]);
      alert.show("Login realizado com sucesso", "success");
      router.push("/");
    } catch (err: any) {
      if (err?.data?.length) {
        setErrors(err.data);
      }
      alert.show(err.message, "error");
    }
  }

  function $reset(): void {
    username.value = "";
    password.value = "";
    setErrors([]);
  }

  return {
    username,
    password,
    errors: dataError,
    setErrors,
    doLogin,
    $reset,
  };
});
