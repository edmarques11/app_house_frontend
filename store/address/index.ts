import { defineStore } from "pinia";
import { alertStore } from "../alert";
import { saveImmobileStore } from "../immobile/save";

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

export const addressStore = defineStore("address", {
  state: () => ({
    data: {
      zip_code: "",
      public_place: "",
      complement: "",
      district: "",
      city: "",
      uf: "",
      number: "",
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
          localidade: city,
          uf,
        }: any = await $fetch(`https://viacep.com.br/ws/${zipCode}/json`);

        Object.assign(this.data, {
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
    },
    async saveAddress() {
      const alert = alertStore();
      const immobile = saveImmobileStore();
      const nuxtApp = useNuxtApp();

      try {
        const {
          data: { id },
        } = await nuxtApp.$axios.post("/address", this.data);
        immobile.data.address_id = id;

        this.setErrors([]);
        alert.show("Endereço salvo com sucesso!", "success");
      } catch (err: any) {
        if (err?.data?.length) {
          this.setErrors(err.data);
        }
        alert.show(err.message, "error");
        throw err;
      }
    },
  },
});
