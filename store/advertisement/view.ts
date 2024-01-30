import { alertStore } from "../alert";
import type {
  IAdvertisement,
  IImobile,
} from "~/store/advertisement/interfaces/ListAdvertisement";

function copyData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export const viewAdvertisementStore = defineStore("viewAdvertisement", () => {
  const defaultData: IAdvertisement = {
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
  };

  const dataView = ref<IAdvertisement>(copyData<IAdvertisement>(defaultData));

  const alert = alertStore();
  const nuxt = useNuxtApp();

  async function getAdvertisement(id: string) {
    try {
      const { data } = await nuxt.$axios.get(`/advertisement/${id}`);

      if (!data.id) return alert.show("Anuncio não encontrado", "error");

      dataView.value = data;
    } catch (err: any) {
      alert.show(err.message, "error");
    }
  }

  function $reset(): void {
    dataView.value = copyData<IAdvertisement>(defaultData);
  }

  return {
    data: dataView,
    getAdvertisement,
    $reset,
  };
});
