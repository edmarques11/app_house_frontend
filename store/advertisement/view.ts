import { alertStore } from "../alert";
import type {
  IAdvertisement,
  IImobile,
} from "~/store/advertisement/interfaces/ListAdvertisement";

export const viewAdvertisementStore = defineStore("viewAdvertisement", {
  state: () => ({
    data: {
      id: "",
      active: 0,
      title: "",
      description: "",
      width: 0,
      length: 0,
      references: "",
      phone_contact: "",
      price: 0,
      immobile_id: "",
      owner_id: "",
      created_at: new Date(),
      updated_at: new Date(),
      immobile: {} as IImobile,
      images: [],
    } as IAdvertisement,
  }),
  actions: {
    async getAdvertisement(id: string) {
      const alert = alertStore();
      const nuxt = useNuxtApp();

      try {
        const { data } = await nuxt.$axios.get(`/advertisement/${id}`);

        if (!data.id) return alert.show("Anuncio não encontrado", "error");

        this.data = data;
      } catch (err: any) {
        alert.show(err.message, "error");
      }
    },
  },
});
