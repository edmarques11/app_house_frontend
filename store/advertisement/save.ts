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

type Image = {
  id?: string;
  publicUrl?: string;
  hash: string;
  created_at: Date;
  updated_at: Date;
};

export const advertisementStore = defineStore("advertisement", {
  state: () => ({
    data: {
      title: "",
      description: "",
      width: null,
      length: null,
      references: "",
      phone_contact: "",
      price: null,
      immobile_id: "",
      owner_id: "",
      images: [] as Image[],
    },
    errors: {
      title: "",
      description: "",
      width: "",
      length: "",
      references: "",
      phone_contact: "",
      price: "",
      immobile_id: "",
      owner_id: "",
      images: "",
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

        this.data.images.push(data);
      } catch (err: any) {
        alert.show(err.message, "error");
        throw err;
      }
    },
    async deleteImage(imageId: string) {
      const alert = alertStore();
      const nuxtApp = useNuxtApp();

      try {
        await nuxtApp.$axios.delete(`/image/${imageId}`);
        this.data.images = this.data.images.filter(
          (image) => image.id !== imageId,
        );

        alert.show("Imagem deletada com sucesso!", "success");
      } catch (err: any) {
        alert.show(err.message, "error");
        throw err;
      }
    },
    async save() {
      const alert = alertStore();
      const nuxtApp = useNuxtApp();

      try {
        const { images, price, length, width, ...restData } = this.data;
        const payload = {
          images: images.map((image) => image.id),
          price: Number(price),
          length: Number(length),
          width: Number(width),
          ...restData,
        };

        await nuxtApp.$axios.post("/advertisement", payload);

        this.setErrors([]);
        alert.show("Anúncio salvo com sucesso!", "success");
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
