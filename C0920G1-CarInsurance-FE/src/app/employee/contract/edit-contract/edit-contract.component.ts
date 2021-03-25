import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ContractService} from "../../../service/contract.service";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {MessageComponent} from "../../admin/message/message.component";
import {ProductService} from "../../../service/product.service";
import {EmployeeService} from "../../../service/employee.service";
import {CarService} from "../../../service/car.service";
import {Product} from "../../../models/product/product";
import {Employee} from "../../../model/employee";
import {Car} from "../../../models/customer/car";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {any} from "codelyzer/util/function";

//Hàm của hưng
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
//HƯng
export class EditContractComponent implements OnInit {
  formUpdateContract: FormGroup;
  contractOfId;
  productList: any[];
  employeeList: any[];
  carList: any[];
  maxDate = new Date();
  minDate = new Date(1900, 0, 1);
  newDate = new Date();
  dateChange: string;
  period;
  time;


  constructor(private router: Router,
              private contractService: ContractService,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private employeeService: EmployeeService,
              private carService: CarService
  ) {
  }

  ngOnInit(): void {
    this.getAllCar();
    this.getAllEmployee();
    this.getAllProduct();
    this.formUpdateContract = new FormGroup({
      id: new FormControl(''),
      startDate: new FormControl('startDate'),
      endDate: new FormControl('endDate'),
      statusPay: new FormControl('statusPay'),
      statusApproval: new FormControl('statusApproval'),
      duration: new FormControl('duration'),
      product: new FormControl('product'),
      employee: new FormControl('employee'),
      car: new FormControl('car'),
    });
    this.activatedRoute.params.subscribe(data => {
      this.contractOfId = Number(data.id);
      this.contractService.getById(this.contractOfId).subscribe(data1 => {
        this.formUpdateContract.patchValue(data1)
      }, error => {
        console.log(error)
      })
    })
  }

  updateContract() {
    console.log(this.formUpdateContract.value);
    this.contractService.updateContract(this.formUpdateContract.value).subscribe(next => {
      this.router.navigate(['employee/contract']);
      setTimeout(() => {
        const dialogRef = this.dialog.open(MessageComponent, {
          data: 'Chỉnh sửa hợp đồng thành công.'
        });
        dialogRef.afterClosed();
      }, 400);
    }, error => {
      console.log(error);
    })
  }

  getAllProduct() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.productList = data;
    }, error => console.log(error));
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe((data: Employee[]) => {
      this.employeeList = data;
    }, error => console.log(error));
  }

  getAllCar() {
    this.carService.getAllCar().subscribe((data: Car[]) => {
      this.carList = data;
    }, error => console.log(error));
  }

  getDate(startDate: any) {
    this.newDate = new Date(startDate);
    this.getEndDate()
  }

  getTime(value) {
    this.period = value;
    this.getEndDate()
  }

  getEndDate() {
    this.dateChange = (this.newDate.getDate() > 9 ? this.newDate.getDate() : '0' + this.newDate.getDate()) + '-'
      + ((this.newDate.getMonth() + 1) > 9 ? (this.newDate.getMonth() + 1) : '0' + (this.newDate.getMonth() + 1))
      + '-' + (this.newDate.getFullYear() + parseInt(this.period))
  }
}

//hưng
