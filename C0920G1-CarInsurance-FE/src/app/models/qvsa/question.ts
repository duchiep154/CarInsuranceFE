import {Users} from "../account/users";

export class Question {
   id: number;
   contentQuestion: string;
   dateQuestion: string;
   private _status: string;
   users: Users;



  set status(value: string) {
    this._status = value;
  }
}
