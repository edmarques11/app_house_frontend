import { alertStore } from "../alert";

type IImage = {
  id?: string;
  publicUrl?: string;
  hash: string;
  created_at: Date;
  updated_at: Date;
};

type IImobile = {
  id?: string;
  type: string;
  address_id: string;
  created_at: Date;
  updated_at: Date;
};

type IAdvertisement = {
  id: string;
  active: number;
  title: string;
  description: string;
  width: number;
  length: number;
  references: string;
  phone_contact: string;
  price: number;
  immobile_id: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
  immobile: IImobile;
  images: IImage[];
};

export const listAdvertisementStore = defineStore("listAdvertisement", {
  state: () => ({
    advertisements: [] as IAdvertisement[],
    page: 1,
    itemsPerPage: 10,
  }),
  actions: {
    async list() {
      const nuxtApp = useNuxtApp();
      const alert = alertStore();

      try {
        const { data } = await nuxtApp.$axios.get("/advertisement", {
          params: {
            page: this.page,
            itemsPerPage: this.itemsPerPage,
          },
        });

        this.advertisements = data;
      } catch (err: any) {
        alert.show(err.message, "error");
      }
    },
  },
});
