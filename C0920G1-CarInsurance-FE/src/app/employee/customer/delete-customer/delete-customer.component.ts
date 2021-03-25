import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
// Cre: nguyen bao
@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.scss']
})
export class DeleteCustomerComponent implements OnInit {
  customerName;
  customerId;
  listCustomerIdHaveNoContract: Observable<any>;
  isExist: boolean;
  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public customerService: CustomerServiceService,
  ) { }
  ngOnInit(): void {
    this.customerName = this.data.data1.name;
    this.customerId = this.data.data1.id;
  }
  onConfirmClick(isDelete: boolean) {
    if (isDelete) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }
}
