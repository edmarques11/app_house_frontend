import { defineStore } from "pinia";
import { alertStore } from "../alert";
import { saveImmobileStore } from "../immobile/save";
import type { IAddress } from "./interfaces/Address";

type ErrorsType = {
  zip_code: "";
  public_place: "";
  complement: "";
  district: "";
  city: "";
  uf: "";
  number: "";
  [key: string]: null | string;
};

function copyData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export const addressStore = defineStore("address", () => {
  const defaultData: IAddress = {
    zip_code: "",
    public_place: "",
    complement: "",
    district: "",
    city: "",
    uf: "",
    number: "",
  };

  const defaultDataError: ErrorsType = {
    zip_code: "",
    public_place: "",
    complement: "",
    district: "",
    city: "",
    uf: "",
    number: "",
  };

  const dataSave = ref<IAddress>(copyData<IAddress>(defaultData));
  const dataError = ref<ErrorsType>(copyData<ErrorsType>(defaultDataError));

  const alert = alertStore();
  const immobile = saveImmobileStore();
  const nuxtApp = useNuxtApp();

  function setErrors(errors: string[]): void {
    const keysErrors = Object.keys(dataError.value);

    keysErrors.forEach((key) => {
      dataError.value[key] =
        errors.find((e) => e.includes(key))?.replace(`${key}: `, "") || null;
    });
  }

  async function getAddressByZipCode(zipCode: string): Promise<void> {
    try {
      const {
        cep: zipcodeResult,
        logradouro: publicPlace,
        complemento: complement,
        bairro: district,
        localidade: city,
        uf,
      }: any = await $fetch(`https://viacep.com.br/ws/${zipCode}/json`);

      Object.assign(dataSave.value, {
        zip_code: zipcodeResult,
        public_place: publicPlace,
        complement,
        district,
        city,
        uf,
      });
    } catch {
      alert.show("CEP inválido!", "error");
    }
  }

  async function saveAddress(): Promise<void> {
    !dataSave.value.number && (dataSave.value.number = null);
    !dataSave.value.complement && (dataSave.value.complement = null);

    try {
      const {
        data: { id },
      } = await nuxtApp.$axios.post("/address", dataSave.value);
      immobile.data.address_id = id;

      setErrors([]);
      alert.show("Endereço salvo com sucesso!", "success");
    } catch (err: any) {
      if (err?.data?.length) {
        setErrors(err.data);
      }
      alert.show(err.message, "error");
      throw err;
    }
  }

  function $reset(): void {
    dataSave.value = copyData<IAddress>(defaultData);
    setErrors([]);
  }

  return {
    data: dataSave,
    errors: dataError,
    getAddressByZipCode,
    saveAddress,
    setErrors,
    $reset,
  };
});
