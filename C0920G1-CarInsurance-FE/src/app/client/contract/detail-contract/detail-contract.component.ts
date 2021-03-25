// Khanh
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContractService} from "../contract.service";

@Component({
  selector: 'app-detail-contract',
  templateUrl: './detail-contract.component.html',
  styleUrls: ['./detail-contract.component.scss']
})
export class DetailContractComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailContractComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public contractService: ContractService) { }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close();
  }
}
// Khanh
