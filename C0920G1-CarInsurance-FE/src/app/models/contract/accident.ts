import {ContractDetail} from "./contract-detail";
import {StatusAccident} from "./status-accident";

export class Accident {
  id: number;
  requestDay: string;
  reason: string;
  img: string;
  notApprovedReason: string;
  money: string;
  contractDetail = new ContractDetail();
  statusAccident = new StatusAccident();
}
