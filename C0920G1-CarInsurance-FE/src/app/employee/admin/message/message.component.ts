import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: string, private dialogRef: MatDialogRef<MessageComponent>) {
  }

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
