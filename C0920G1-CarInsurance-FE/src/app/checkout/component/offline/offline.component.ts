import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<OfflineComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `35%`, top: `60px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

}
