export interface IAddress {
  id?: string;
  zip_code: string;
  public_place: string;
  complement: string | null;
  district: string;
  city: string;
  number?: string | null;
  uf: string;
  created_at?: Date;
  updated_at?: Date;
}
