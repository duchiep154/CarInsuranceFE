import {Customer} from "./customer";

export class Car {

   id: number;
   numberPlate: string;
   carIdNumber: string;
   manufacturer: string;
   yearManufacturing: string;
   customer = new Customer();
}
