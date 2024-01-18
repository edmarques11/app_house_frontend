import { alertStore } from "../alert";
import type { IAdvertisement } from "./interfaces/ListAdvertisement";

export const listAdvertisementStore = defineStore("listAdvertisement", {
  state: () => ({
    advertisements: [] as IAdvertisement[],
    page: 1,
    itemsPerPage: 10,
    total: 0,
  }),
  actions: {
    async list() {
      const nuxtApp = useNuxtApp();
      const alert = alertStore();

      try {
        const {
          data: { advertisements, total },
        } = await nuxtApp.$axios.get("/advertisement", {
          params: {
            page: this.page,
            itemsPerPage: this.itemsPerPage,
          },
        });

        this.advertisements = advertisements;
        this.total = total;
      } catch (err: any) {
        alert.show(err.message, "error");
      }
    },
  },
});
