import { defineStore } from "pinia";
import { alertStore } from "../alert";
import { advertisementStore } from "../advertisement/save";

type ErrorsType = {
  type: "";
  address_id: "";
  [key: string]: null | string;
};

export const saveImmobileStore = defineStore("saveImmobile", {
  state: () => ({
    data: {
      type: "",
      address_id: "",
    },
    errors: {
      type: "",
      address_id: "",
    } as ErrorsType,
  }),
  actions: {
    setErrors(errors: string[]) {
      const keysErrors = Object.keys(this.errors);

      keysErrors.forEach((key) => {
        this.errors[key] =
          errors.find((e) => e.includes(key))?.replace(`${key}: `, "") || null;
      });
    },
    async save() {
      const alert = alertStore();
      const advertisement = advertisementStore();
      const nuxtApp = useNuxtApp();

      try {
        const {
          data: { id },
        } = await nuxtApp.$axios.post("/immobile", this.data);
        advertisement.data.immobile_id = id;

        this.setErrors([]);
        alert.show("Imóvel salvo com sucesso!", "success");
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
