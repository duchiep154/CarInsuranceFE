import {Users} from "../account/users";
import {Question} from "./question";

export class Answer {
   id: number;
   contentAnswer: string;
   dateAnswer: string;
   users: Users;
   question: Question;
}
