import { defineStore } from "pinia";
import { alertStore } from "../alert";
import { advertisementStore } from "../advertisement/save";
import type { IImobile } from "./interfaces/Immobile";

type ErrorsType = {
  type: "";
  address_id: "";
  [key: string]: null | string;
};

function copyData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export const saveImmobileStore = defineStore("saveImmobile", () => {
  const defaultData: IImobile = {
    type: "",
    address_id: "",
  };

  const defaultDataError: ErrorsType = {
    type: "",
    address_id: "",
  };

  const dataSave = ref<IImobile>(copyData<IImobile>(defaultData));
  const dataError = ref<ErrorsType>(copyData<ErrorsType>(defaultDataError));

  const alert = alertStore();
  const advertisement = advertisementStore();
  const nuxtApp = useNuxtApp();

  function setErrors(errors: string[]): void {
    const keysErrors = Object.keys(dataError.value);

    keysErrors.forEach((key) => {
      dataError.value[key] =
        errors.find((e) => e.includes(key))?.replace(`${key}: `, "") || null;
    });
  }

  async function save(): Promise<void> {
    try {
      const {
        data: { id },
      } = await nuxtApp.$axios.post("/immobile", dataSave.value);
      advertisement.data.immobile_id = id;

      setErrors([]);
      alert.show("Imóvel salvo com sucesso!", "success");
    } catch (err: any) {
      if (err?.data?.length) {
        setErrors(err.data);
      }
      alert.show(err.message, "error");
      throw err;
    }
  }

  function $reset(): void {
    dataSave.value = copyData<IImobile>(copyData<IImobile>(defaultData));
    setErrors([]);
  }

  return {
    data: dataSave,
    errors: dataError,
    setErrors,
    save,
    $reset,
  };
});
