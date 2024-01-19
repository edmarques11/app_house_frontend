import { alertStore } from "../alert";
import type { IAdvertisement } from "~/store/advertisement/interfaces/ListAdvertisement";

export const viewAdvertisementStore = defineStore("viewAdvertisement", {
  state: () => ({
    data: {} as IAdvertisement,
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
