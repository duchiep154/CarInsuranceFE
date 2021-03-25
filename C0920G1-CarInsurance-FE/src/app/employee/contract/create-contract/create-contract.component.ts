import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CarService} from "../../../service/car.service";
import {EmployeeService} from "../../../service/employee.service";
import {ProductService} from "../../../service/product.service";
import {MessageComponent} from "../../admin/message/message.component";
import {ContractService} from "../../../service/contract.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomerServiceService} from "../../../service/customer-service.service";

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss']
})
export class CreateContractComponent implements OnInit {
  public formCreateContract: FormGroup;
  public cars: any[];
  public employees: any[];
  public products: any[];
  public customers: any[];
  listError: any = "";
  loading = false;
  isCheck = true;
  toDay = new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private carService: CarService,
    private employeeService: EmployeeService,
    private productService: ProductService,
    private contractService: ContractService,
    private customerService: CustomerServiceService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.isCheck = true;
    this.getAllCars();
    this.getAllEmployee();
    this.getAllProduct();
    this.getAllCustomer();
    this.formCreateContract = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      statusApproval: ['', [Validators.required]],
      statusPay: ['', [Validators.required]],
      numberPlate: ['', [Validators.required, Validators.pattern(/[0-9]{2}[A-Z][0-9][-][0-9]{4,5}/)]],
      carIdNumber: ['', [Validators.required, Validators.pattern(/[A-Za-z0-9]{9,12}/)]],
      manufacturer: ['', [Validators.required, Validators.pattern((/[A-Z]+/))]],
      yearManufacturing: ['', [Validators.required, Validators.pattern(/[2-9][0-9]{3}/)]],
      customer: ['', [Validators.required]],
      employee: ['', [Validators.required]],
      product: ['', [Validators.required]],
    });
  }

  addNewContract(formValue) {
    this.isCheck = false;
    console.log(formValue);

    if (this.formCreateContract.valid) {
      this.contractService.addNewContract(formValue).subscribe(data => {
        this.router.navigateByUrl('/employee/contract');
        setTimeout(() => {
          const dialogRef = this.dialog.open(MessageComponent, {
            data: 'Thêm mới hợp đồng thành công.'
          });
          dialogRef.afterClosed();
        }, 400);
      }, error => {
        this.alertInvalid();
        if (error.status === 400) {
          console.log(error.error);
          this.listError = error.error;
        } else if (error.status === 404) {

        }
      }, () => {
        this.loading = false;
      });
    } else {
      this.contractService.addNewContract(formValue).subscribe(data => {
      }, error => {
        this.alertInvalid();
        if (error.status === 400) {
          console.log(error.error);
          this.listError = error.error;
        } else if (error.status === 404) {
        }
      }, () => {
        this.loading = false;
      });
    }
  }


  private getAllCars(){
    this.carService.getAllCar().subscribe(data => {
      this.cars = data;
    })
  }

  private getAllEmployee() {
    this.employeeService.getAllEmployeeContract().subscribe(data => {
      this.employees = data;
    })
  }

  private getAllProduct() {
    this.productService.getAllProduct().subscribe(data => {
      this.products = data;
    })
  }

  private getAllCustomer() {
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
    })
  }


  alertInvalid() {
    this.openSnackBar('Dữ liệu nhập không đúng, vui lòng nhập lại', 'X', 'invalid-snackbar')
  }

  // Hien thi snackbar
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className]
    });
  }

  checkInput(item) {
    if (this.listError !== "") {
      this.isCheck = false;
      switch (item) {
        case "numberPlate":
          this.listError.numberPlate = "";
          this.isCheck = true;
          break;
        case "carIdNumber":
          this.listError.carIdNumber = "";
          this.listError.existCarId="";
          this.isCheck = true;
          break;
        case "manufacturer" :
          this.listError.manufacturer = "";
          this.isCheck = true;
          break;
        case "yearManufacturing":
          this.listError.yearManufacturing = "";
          this.isCheck = true;
          break;
        case "customer":
          this.listError.customer = "";
          this.isCheck = true;
          break;
        case "startDate":
          this.listError.startDate = "";
          this.isCheck = true;
          break;
        case "endDate":
          this.listError.endDate = "";
          this.isCheck = true;
          break;
        case "duration":
          this.listError.duration = "";
          this.isCheck = true;
          break;
        case "statusApproval":
          this.listError.statusApproval = "";
          this.isCheck = true;
          break;
        case "statusPay":
          this.listError.statusPay = "";
          this.isCheck = true;
          break;
        case "product":
          this.listError.product = "";
          this.isCheck = true;
          break;
        case "employee":
          this.listError.employee = "";
          this.isCheck = true;
          break;
      }
    }
  }
}
