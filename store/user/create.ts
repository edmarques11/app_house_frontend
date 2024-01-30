import { defineStore } from "pinia";
import { alertStore } from "../alert";
import type { CreateUserDTO } from "./interfaces/User";

type ErrorsType = {
  name: null | string;
  email: null | string;
  password: null | string;
  profile_image_id: null | string;
  [key: string]: null | string;
};

function copyData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export const createUserStore = defineStore("createUser", () => {
  const defaultData: CreateUserDTO = {
    name: "",
    email: "",
    password: "",
    profile_image_id: "",
  };
  const defaultDataError: ErrorsType = {
    name: null,
    email: null,
    password: null,
    profile_image_id: null,
  };

  const dataCreate = ref<CreateUserDTO>(copyData<CreateUserDTO>(defaultData));
  const dataError = ref<ErrorsType>(copyData<ErrorsType>(defaultDataError));

  const alert = alertStore();
  const nuxtApp = useNuxtApp();

  function setErrors(errors: string[]): void {
    const keysErrors = Object.keys(dataError.value);

    keysErrors.forEach((key) => {
      dataError.value[key] =
        errors.find((e) => e.includes(key))?.replace(`${key}: `, "") || null;
    });
  }

  async function create(): Promise<void> {
    try {
      if (!dataCreate.value.profile_image_id)
        delete dataCreate.value.profile_image_id;

      await nuxtApp.$axios.post("/user", dataCreate.value);

      setErrors([]);
      alert.show("Cadastro realizado com sucesso!", "success");
    } catch (err: any) {
      if (err?.data?.length) {
        setErrors(err.data);
      }
      alert.show(err.message, "error");
    }
  }

  function $reset(): void {
    dataCreate.value = copyData<CreateUserDTO>(defaultData);
    setErrors([]);
  }

  return {
    data: dataCreate,
    errors: dataError,
    setErrors,
    create,
    $reset,
  };
});
