import {Component, OnInit} from '@angular/core';
import {Employee} from "../../../model/employee";
import {EmployeeService} from "../../../service/employee.service";
import {PositionService} from "../../../service/position.service";
import {UsersService} from "../../../service/users.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {Router} from "@angular/router";
import {MessageComponent} from "../message/message.component";
import {AbstractControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditCustomerEmployeeComponent} from "../../customer/edit-customer-employee/edit-customer-employee.component";
import {DetailEmployeeComponent} from "../../employee/detail-employee/detail-employee.component";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  employeeList: Employee[] = [];
  loading = false;

  constructor(private employeeService: EmployeeService,
              private positionService: PositionService,
              private usersService: UsersService,
              private dialog: MatDialog,
              public router: Router,
              private snackBar: MatSnackBar) {}
  searchInput ="";
  public employees = [];
  textSorting = "";
  size = 5;
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  onSorting = false;

  ngOnInit(): void {
    this.onSubmit(0);
  }


  onSubmit(page) {
    this.employeeService.getAllEmployees(page, this.size, this.onSorting, this.textSorting).subscribe(
      data => {
        this.employees = data.content;
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => {
        if (error.status === 204) {
        }
      }
    );
  }

  //Tìm kiếm nhân viên
  search(page) {
      this.employeeService.getAllEmployeeByNameOrPhone(this.searchInput, this.size).subscribe(data => {
        if (data == null) {
          this.pageClicked = 0;
          this.pages = [];
          this.totalPages = 1;
          this.employees = [];
          this.alertInvalid();
        } else {
          this.employees = data.content;
          this.pageClicked = page;
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      });
  }

  //Trang trước
  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

  //Trang sau
  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }

  //Trang đầu
  onFirst() {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  //Trang cuối
  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.onSubmit(this.pageClicked);
  }

  //Thay đổi giá trị để sort các trường
  onSortingChange(value) {
    this.onSorting = !this.onSorting;
    this.textSorting = value;
    this.ngOnInit();
  }

  //hàm xóa material của hưng không được xóa
  deleteEmployee(id: number) {
    const employeeByIdId = this.employeeList.find(item => item.id === id);
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: employeeByIdId && employeeByIdId.name
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.loading = true;
      if (confirmed == true) {
        this.employeeService.delete(id).subscribe(data => {
          const dialogRef = this.dialog.open(MessageComponent, {
            data: 'Xóa thành công.'
          });
          dialogRef.afterClosed();
          this.ngOnInit();
        },error => {
          if (error.status === 400){
            const dialogRef = this.dialog.open(MessageComponent, {
              data: 'Xóa không thành công vì nhân viên này đang làm hợp đồng.'
            });
            dialogRef.afterClosed();
          }
        });
      }
    });
  }
  alertInvalid() {
    this.openSnackBar('Không tìm thấy dữ liệu', 'X', 'invalid-snackbar')
  }

  // Hien thi snackbar
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 1500,
      panelClass: [className]
    });
  }

  openDetailDialog(id): void {
    this.employeeService.getById(id).subscribe(result => {
      const dialogRef = this.dialog.open(DetailEmployeeComponent, {
        width: '60%',
        height: '90%',
        data: {data1: result},
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    })
  }
}
