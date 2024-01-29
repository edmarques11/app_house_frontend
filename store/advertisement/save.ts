import { defineStore } from "pinia";
import { alertStore } from "../alert";
import type { IAdvertisement } from "./interfaces/SaveAdvertisement";

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

export const advertisementStore = defineStore("advertisement", () => {
  const defaultData: IAdvertisement = {
    title: "",
    description: "",
    width: 0,
    length: 0,
    references: "",
    phone_contact: "",
    price: "",
    immobile_id: "",
    owner_id: "",
    images: [],
  };
  const defaultDataError: ErrorsType = {
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
  };

  const dataSave = ref<IAdvertisement>(defaultData);
  const errorsSave = ref<ErrorsType>(defaultDataError);

  const alert = alertStore();
  const nuxtApp = useNuxtApp();

  function setErrors(errors: string[]): void {
    const keysErrors = Object.keys(errorsSave.value);

    keysErrors.forEach((key) => {
      errorsSave.value[key] =
        errors.find((e) => e.includes(key))?.replace(`${key}: `, "") || null;
    });
  }

  async function uploadImage(file: File): Promise<void> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await nuxtApp.$axios.post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dataSave.value.images.push(data);
    } catch (err: any) {
      alert.show(err.message, "error");
      throw err;
    }
  }

  async function deleteImage(imageId: string): Promise<void> {
    try {
      await nuxtApp.$axios.delete(`/image/${imageId}`);
      dataSave.value.images = dataSave.value.images.filter(
        (image) => image.id !== imageId,
      );

      alert.show("Imagem deletada com sucesso!", "success");
    } catch (err: any) {
      alert.show(err.message, "error");
      throw err;
    }
  }

  async function save(): Promise<void> {
    try {
      const { images, price, width, length, ...restData } = dataSave.value;
      const payload = {
        images: images.map((image) => image.id),
        price: Number(price.replaceAll(".", "").replace(",", ".")),
        width: Number(width),
        length: Number(length),
        ...restData,
      };

      await nuxtApp.$axios.post("/advertisement", payload);

      setErrors([]);
      alert.show("Anúncio salvo com sucesso!", "success");
    } catch (err: any) {
      if (err?.data?.length) {
        setErrors(err.data);
      }
      alert.show(err.message, "error");
      throw err;
    }
  }

  function $reset(): void {
    dataSave.value = defaultData;
    errorsSave.value = defaultDataError;
  }

  return {
    data: dataSave,
    errors: errorsSave,
    uploadImage,
    deleteImage,
    save,
    $reset,
  };
});
