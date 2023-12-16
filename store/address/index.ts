import { defineStore } from "pinia";
import { alertStore } from "../alert";

type ErrorsType = {
  zip_code: "";
  public_place: "";
  complement: "";
  district: "";
  state: "";
  uf: "";
  [key: string]: null | string;
};

export const addressStore = defineStore("address", {
  state: () => ({
    data: {
      zip_code: "",
      public_place: "",
      complement: "",
      district: "",
      state: "",
      uf: "",
    },
    errors: {} as ErrorsType,
  }),
  actions: {
    setErrors(errors: string[]) {
      const keysErrors = Object.keys(this.errors);

      keysErrors.forEach((key) => {
        this.errors[key] =
          errors.find((e) => e.includes(key))?.replace(`${key}: `, "") || null;
      });
    },
    async getAddressByZipCode(zipCode: string) {
      const alert = alertStore();

      try {
        const {
          cep: zipcodeResult,
          logradouro: publicPlace,
          complemento: complement,
          bairro: district,
          localidade: state,
          uf,
        }: any = await $fetch(`https://viacep.com.br/ws/${zipCode}/json`);

        Object.assign(this.data, {
          zip_code: zipcodeResult,
          public_place: publicPlace,
          complement,
          district,
          state,
          uf,
        });
      } catch {
        alert.show("CEP inválido!", "error");
      }
    },
    async saveAddress() {
      const alert = alertStore();
      const nuxtApp = useNuxtApp();

      try {
        await nuxtApp.$axios.post("/address", this.data);

        this.setErrors([]);
        alert.show("Endereço salvo com sucesso!", "success");
      } catch (err: any) {
        if (err?.data?.length) {
          this.setErrors(err.data);
        }
        alert.show(err.message, "error");
      }
    },
  },
});
