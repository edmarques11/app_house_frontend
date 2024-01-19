import type { IImage } from "~/store/image/interfaces/Image";

export type IAdvertisement = {
  title: "";
  description: "";
  width: null;
  length: null;
  references: "";
  phone_contact: "";
  price: null;
  immobile_id: "";
  owner_id: "";
  images: IImage[];
};
