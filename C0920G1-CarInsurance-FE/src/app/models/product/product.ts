import {CarType} from "./car-type";
import {ProductType} from "./product-type";

export class Product {
  id: number;
  name: string;
  personNumber: string;
  statusProduct: string;
  carType: CarType;
  productType: ProductType;
  productPrice: string;

}
