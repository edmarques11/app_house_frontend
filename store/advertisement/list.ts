import { alertStore } from "../alert";
import type { IAdvertisement } from "./interfaces/ListAdvertisement";

export const listAdvertisementStore = defineStore("listAdvertisement", {
  state: () => ({
    advertisements: [] as IAdvertisement[],
    page: 1,
    itemsPerPage: 10,
    total: 0,
    location: "",
  }),
  actions: {
    async list(toOwner = 0) {
      const nuxtApp = useNuxtApp();
      const alert = alertStore();

      try {
        const {
          data: { advertisements, total },
        } = await nuxtApp.$axios.get("/advertisement", {
          params: {
            page: this.page,
            itemsPerPage: this.itemsPerPage,
            toOwner,
            location: this.location,
          },
        });

        this.advertisements = advertisements;
        this.total = total;
      } catch (err: any) {
        alert.show(err.message, "error");
      }
    },
    async deleteAdvertisement(id: string) {
      const alert = alertStore();
      const nuxt = useNuxtApp();

      try {
        await nuxt.$axios.delete(`/advertisement/${id}`);

        alert.show("Anuncio deletado com sucesso", "success");
      } catch (err: any) {
        alert.show(err.message, "error");
      }
    },
  },
});
