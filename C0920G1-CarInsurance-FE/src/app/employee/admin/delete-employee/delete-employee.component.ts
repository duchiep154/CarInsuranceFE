import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from "../../../service/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent implements OnInit {
  dataTemp: string;

  constructor(private employeeService: EmployeeService,
              @Inject(MAT_DIALOG_DATA) private data: string, private dialogRef: MatDialogRef<DeleteEmployeeComponent>) {
    this.dataTemp = data
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
