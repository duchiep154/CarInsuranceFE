import {Contract} from "../../models/contract/contract";
import {ContractDetail} from "../../models/contract/contract-detail";

export class BillListDTO {
 idUser:string;

 totalPay:number;
  contractDetaiList : ContractDetail[];
 contractList : Contract[];

}
