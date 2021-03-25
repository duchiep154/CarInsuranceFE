import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {ChangeStatusComponentComponent} from "../change-status-component/change-status-component.component";
import {UpdateProductComponent} from "../update-product/update-product.component";
import { ProductService } from 'src/app/service/product.service';
import {Router} from "@angular/router";
import {DeleteProductComponent} from "../delete-product/delete-product.component";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from "rxjs";
import {QaService} from "../../../question-and-answer/qa.service";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})

export class ListProductComponent implements OnInit {
  public search = '';
  public productTrues;

  public productFalses;
  size = 5;
  nameSorting = false;
  pageClicked = 0;
  totalPages = 1;
  pages = [];

  public productUpdateDTOs: Observable<any>;
  status: any;

  constructor(
    public qaService: QaService,
    public productService: ProductService,
    public dialog: MatDialog,
    public router: Router,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    // this.productService.getProductDTOIdAndName().subscribe(dataProductDTOs => {
    //   console.log(dataProductDTOs);
    // })
    this.onSubmitTrue(0);
  }

  //  Lấy danh sách tồn tại + tìm kiếm-THINH
  onSubmitTrue(pageTrue) {
    this.productService
      .getProductSearchTrue(this.search, this.size, pageTrue, this.nameSorting)
      .subscribe((data) => {
        this.productTrues = data.content;
        this.pageClicked = pageTrue;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(
          Number.call,
          Number
        );
      });
  }

  // Lấy danh sách tạm ẩn + tìm kiếm -THINH
  onSubmitFalse(pageFalse) {
    this.productService
      .getProductSearchFalse(this.search, this.size, pageFalse, this.nameSorting)
      .subscribe((data) => {
        this.productFalses = data.content;
        this.pageClicked = pageFalse;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(
          Number.call,
          Number
        );
      });
  }

  // Phân trang-THINH
  onNextTrue() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmitTrue(this.pageClicked);
    }
  }

  onNextFalse() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmitFalse(this.pageClicked);
    }
  }

  onPreviousTrue() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmitTrue(this.pageClicked);
    }
  }

  onPreviousFalse() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmitFalse(this.pageClicked);
    }
  }

  onFirstTrue() {
    this.pageClicked = 0;
    this.onSubmitTrue(this.pageClicked);
  }

  onFirstFalse() {
    this.pageClicked = 0;
    this.onSubmitFalse(this.pageClicked);
  }

  onLastTrue() {
    this.pageClicked = this.totalPages - 1;
    this.onSubmitTrue(this.pageClicked);
  }

  onLastFalse() {
    this.pageClicked = this.totalPages - 1;
    this.onSubmitFalse(this.pageClicked);
  }


  // Hieu 2021-03-16
  // đổi status sản phẩm từ true thành false
  // và trả về trang đang xem
  openChangeStatusDialog(productTrueId): void {
    this.productService.findProductById(productTrueId).subscribe(dataOfProduct => {
      const dialogRef = this.dialog.open(ChangeStatusComponentComponent, {
          width: '500px',
          data: {dataProduct: dataOfProduct},
          disableClose: true,
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        this.onSubmitTrue(this.pageClicked);
      });
    })
  }

  // hieu 2021-03-17
  // tính năng: update thông tin sản phẩm
  // và trả về trang đang xem
  openUpdateDialog(productTrueId): void {
    this.productService.findProductById(productTrueId).subscribe(dataOfProduct => {
      const dialogRef = this.dialog.open(UpdateProductComponent, {
          width: '600px',
          data: {dataProduct: dataOfProduct},
          disableClose: true,
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        this.onSubmitTrue(this.pageClicked);
      });
    })
  }

  // hieu 2021-03-17
  // tính năng: đưa sản phẩm từ danh sách tạm ẩn sang danh sách đang dùng
  // và trả về trang đang xem
  restoreStatusProduct(productId): void {
    this.productService.changeStatusProduct(productId).subscribe(data => {
      this.onSubmitFalse(this.pageClicked);
      this.productService.openSnackBar('Đã thành công', 'OK');
    });
  }

  // hieu 2021-03-17
  // tính năng: xóa hẳn sản phẩm trong danh sách tạm ẩn ra khỏi database
  // và trả về trang đang xem
  openDeleteDialog(productId): void {
    this.productService.findProductById(productId).subscribe(dataTransferProduct => {
      const dialogRef = this.dialog.open(DeleteProductComponent, {
        width: '500px',
        data: {dataTransfer: dataTransferProduct},
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe(result => {
        this.onSubmitFalse(this.pageClicked);
      });
    });
  }

  checkSeen(answerId: number) {
    this.qaService.getStatus(answerId).subscribe(data => {
      this.status = data;
    })


// ----------------------------------------------

  }
}




