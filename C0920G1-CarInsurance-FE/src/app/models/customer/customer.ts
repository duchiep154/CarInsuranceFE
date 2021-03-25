import {Users} from "../account/users";

export class Customer {
   id: number;
   name: string;
   gender: string;
   dateOfBirth: string;
   idCard: string;
   phone: string;
   email: string;
   address: string;
   city: string;
   img: string;
   users = new Users();

}
