import {Contract} from "./contract";
import {Observable} from "rxjs";

export class ContractDetail {
   id: number;
   contract : Contract
   status: string;
   payment: string;
   paymentType: string;
}
