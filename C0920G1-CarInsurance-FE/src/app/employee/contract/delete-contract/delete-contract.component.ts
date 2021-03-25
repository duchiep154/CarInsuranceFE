import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContractService} from "../../../service/contract.service";

@Component({
  selector: 'app-delete-contract',
  templateUrl: './delete-contract.component.html',
  styleUrls: ['./delete-contract.component.scss']
})
export class DeleteContractComponent implements OnInit {
  dataTemp: string;

  constructor(private contractService: ContractService,
              @Inject(MAT_DIALOG_DATA) private data: string, private dialogRef: MatDialogRef<DeleteContractComponent>) {
    this.dataTemp = data;
    }

  ngOnInit(): void {
  }

  onConfirmClick(isDelete: boolean) {
    if (isDelete) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }
}
