import { FedexModal } from "./fedex.modal";
import { UpsModal } from "./ups.modal";
import { ProductType } from "../enums/productType.enum";

export interface ApiProductModal {
  fedex?: FedexModal;
  type: ProductType;
  ups?: UpsModal[];
  creationDate?: number;
  deliveryComp?: string;
  description?: string;
  id?: number;
  name?: string;
  price?: number;
  thumbnailUrl?: string;
  url?: string;
}

export interface ProductModal {
  creationDate: number;
  description: string;
  id: number;
  name: string;
  price: number;
  thumbnailUrl: string;
  url: string;
  type: ProductType;
}
