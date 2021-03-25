import {Position} from "./position";
import {Users} from "./users";

export class Employee {
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
  position: Position;
  users: Users;
}
