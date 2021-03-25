import {Car} from "../customer/car";
import {Employee} from "../employee/employee";
import { Product } from '../product/product';

export class Contract {
   id: string;
   startDate: string;
   endDate: string;
   uses: string;
   statusPay: string;
   statusApproval: string;
   paymentOption: string;
   product = new Product();
   employee: Employee;
   car = new Car();
}
