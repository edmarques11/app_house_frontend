import { defineStore } from "pinia";
import { alertStore } from "../alert";

type ErrorsType = {
  title: string;
  description: string;
  width: string;
  length: string;
  references: string;
  phone_contact: string;
  price: string;
  immobile_id: string;
  owner_id: string;
  images: string;
  [key: string]: null | string;
};

export const advertisementStore = defineStore("advertisement", {
  state: () => ({
    data: {
      title: "",
      description: "",
      width: "",
      length: "",
      references: "",
      phone_contact: "",
      price: 0,
      immobile_id: "",
      owner_id: "",
      images: "",
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
    async uploadImage(file: File) {
      const nuxtApp = useNuxtApp();
      const alert = alertStore();

      try {
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await nuxtApp.$axios.post("/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(data);
      } catch (err: any) {
        alert.show(err.message, "error");
        throw err;
      }
    },
    async save() {
      const alert = alertStore();
      const nuxtApp = useNuxtApp();

      try {
        await nuxtApp.$axios.post("/advertisement", this.data);

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
