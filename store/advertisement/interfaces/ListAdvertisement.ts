import type { IAddress } from "~/store/address/interfaces/Address";
import type { IImage } from "~/store/image/interfaces/Image";

export type IImobile = {
  id?: string;
  type: string;
  address: IAddress;
  address_id: string;
  created_at: Date;
  updated_at: Date;
};

export type IAdvertisement = {
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
