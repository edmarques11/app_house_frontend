import { alertStore } from "../alert";
import type { IAdvertisement } from "./interfaces/ListAdvertisement";

export const listAdvertisementStore = defineStore("listAdvertisement", () => {
  const advertisements = ref<IAdvertisement[]>([]);
  const page = ref(1);
  const itemsPerPage = ref(10);
  const total = ref(0);
  const location = ref("");
  const loading = ref(false);

  const alert = alertStore();
  const nuxtApp = useNuxtApp();

  async function list(toOwner = 0): Promise<void> {
    try {
      loading.value = true;

      const {
        data: { advertisements: results, total: totalItems },
      } = await nuxtApp.$axios.get("/advertisement", {
        params: {
          page: page.value,
          itemsPerPage: itemsPerPage.value,
          toOwner,
          location: location.value,
        },
      });

      advertisements.value = results;
      total.value = totalItems;
    } catch (err: any) {
      alert.show(err.message, "error");
    } finally {
      loading.value = false;
    }
  }

  async function deleteAdvertisement(id: string): Promise<void> {
    try {
      await nuxtApp.$axios.delete(`/advertisement/${id}`);

      alert.show("Anuncio deletado com sucesso", "success");
    } catch (err: any) {
      alert.show(err.message, "error");
    }
  }

  function $reset(): void {
    advertisements.value = [] as IAdvertisement[];
    page.value = 1;
    itemsPerPage.value = 10;
    total.value = 0;
    location.value = "";
    loading.value = false;
  }

  return {
    advertisements,
    page,
    itemsPerPage,
    total,
    location,
    loading,
    list,
    deleteAdvertisement,
    $reset,
  };
});
