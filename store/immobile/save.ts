import { defineStore } from "pinia";
import { alertStore } from "../alert";

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
    async save() {
      const alert = alertStore();
      const nuxtApp = useNuxtApp();

      try {
        await nuxtApp.$axios.post("/immobile", this.data);

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
