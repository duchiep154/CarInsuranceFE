import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-comfirm',
  templateUrl: './comfirm.component.html',
  styleUrls: ['./comfirm.component.scss']
})
export class ComfirmComponent implements OnInit {

  constructor(private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: string, private dialogRef: MatDialogRef<ComfirmComponent>) { }

  ngOnInit(): void {
  }

  onConfirmClick(isOpen: boolean) {
    if (isOpen) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }
}
