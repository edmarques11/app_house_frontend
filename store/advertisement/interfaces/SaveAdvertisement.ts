import type { IImage } from "~/store/image/interfaces/Image";

export type IAdvertisement = {
  title: string;
  description: string;
  width: number;
  length: number;
  references: string;
  phone_contact: string;
  price: string;
  immobile_id: string;
  owner_id: string;
  images: IImage[];
};
