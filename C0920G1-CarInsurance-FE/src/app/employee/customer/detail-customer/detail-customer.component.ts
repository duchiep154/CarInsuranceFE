import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerServiceService} from "../../../service/customer-service.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {dateOfBirth} from "../edit-customer-employee/customer-validator/date-of-birth.validator";

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent implements OnInit {
  formEditCustomer: FormGroup;
  customerId;
  src = '';
  message: any;
  img = '';
  style = 'display: none';


  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerServiceService,
    private storage: AngularFireStorage,
    private dialogRef: MatDialogRef<DetailCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.formEditCustomer = this.formBuilder.group({
      name: [''],
      gender: [''],
      dateOfBirth: [''],
      idCard: [''],
      phone: [''],
      email: [''],
      address: [],
      city: [''],
      img: []
    });

    this.customerId = this.data.data1.id;
    this.customerService.getCustomerById(this.customerId).subscribe(data => {
      this.img = data.img;
      this.formEditCustomer.patchValue(data);
    })
  }

  closeBigImg() {
    this.style = 'display: none'
  }

  showBigImg(img) {
    this.src = img;
    this.style = 'position: fixed; top: 360px; width: 130px; left: 780px; z-index: 1000; display: block'

  }
}
