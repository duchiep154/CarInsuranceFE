import {Employee} from "../employee/employee";
import {Customer} from "../customer/customer";

export class Users {
   id: number;
   username: string;
   password: string;
   employee: Employee;
   customer: Customer;
}
