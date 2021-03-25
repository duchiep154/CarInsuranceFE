import { CarService } from 'src/app/service/car.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-car',
  templateUrl: './delete-car.component.html',
  styleUrls: ['./delete-car.component.scss']
})
export class DeleteCarComponent implements OnInit {
  carId;

  constructor(
    public dialogRef: MatDialogRef<DeleteCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public carService: CarService,
  ) { }

  ngOnInit(): void {
    this.carId = this.data.data1.id;
  }

  onConfirmClick(isDelete: boolean) {
    if (isDelete) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }
}
