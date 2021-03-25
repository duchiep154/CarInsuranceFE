import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerServiceService} from "../../../service/customer-service.service";
import {Router} from "@angular/router";
import {CarService} from "../../../service/car.service";
import {MessageComponent} from "../../admin/message/message.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent implements OnInit {
  customers: any[];
  formAddNewCar: FormGroup;
  check;
  constructor(
    public formBuilder: FormBuilder,
    public customerService: CustomerServiceService,
    public router: Router,
    public carService: CarService,
    public dialog : MatDialog
  ) {
  }
// Thế Anh Xét dữ liệu trang thêm mới xe
  ngOnInit(): void {
    this.getAllCustomer();
    this.formAddNewCar = this.formBuilder.group({
      numberPlate: ['', [Validators.required,Validators.pattern('[0-9]{2}[A-Z][0-9][-][0-9]{4,5}')]],
      carIdNumber: ['', [Validators.required,Validators.pattern('[A-Za-z0-9]{9,12}')]],
      manufacturer: ['', [Validators.required,Validators.pattern('[A-Z]+')]],
      yearManufacturing: ['', [Validators.required]],
      customer: ['', [Validators.required]],
    })
  }
// Thế anh  thêm mới xe
  addNewCar(value) {
    this.carService.addNewCar(value).subscribe(data => {
      this.router.navigateByUrl('/employee/cars-list');
      setTimeout(() => {
        const dialogRef = this.dialog.open(MessageComponent, {
          data: 'Thêm mới khách hàng thành công.'
        });
        dialogRef.afterClosed();
      }, 400);
    })
  }
// thế Anh xét khách hàng theo xe
   getAllCustomer() {
    this.carService.getAllCustomer().subscribe(data => {
      this.customers = data;
    });
  }
}
