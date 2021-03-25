import { Component, OnInit } from '@angular/core';
import {AccidentClientService} from "../../../api-service/accident-client.service";
import {ContractDetail} from "../../../models/contract/contract-detail";

@Component({
  selector: 'app-test-contract-detail',
  templateUrl: './test-contract-detail.component.html',
  styleUrls: ['./test-contract-detail.component.scss']
})
export class TestContractDetailComponent implements OnInit {
  public contractDetails: ContractDetail[];
  constructor(private accidentClientService: AccidentClientService) { }

  ngOnInit(): void {
    this.accidentClientService.getListContractDetail().subscribe(data=> {
      console.log(data);
      this.contractDetails = data;
    })
  }

}
