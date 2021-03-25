import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductService} from "../../../service/product.service";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {
  public productName;
  public productOfId;

  constructor(
    public productService: ProductService,
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.productName = this.data.dataTransfer.name;
    this.productOfId = this.data.dataTransfer.id;
  }

  public messageErrorIdDelete: string;
  public check = false
  public listProductIdNotInContract: Observable<any>;
  public isExist = true;
  deleteProduct(): void {
    this.isExist = false;
    this.listProductIdNotInContract = this.productService.getListProductIdNotInContract();
    // Check xem id product muốn xóa có nằm trong danh sách không có trong hợp đồng hay không
    this.listProductIdNotInContract.forEach(dataListId => {
      for (let idKey of dataListId) {
        if (idKey == this.productOfId) {
          this.isExist = true;
        }
      }
      // nếu có thì cho phép xóa và hiện message snack bar,
      // có lỗi validate từ BE thì sẽ gởi message lên
      if (this.isExist) {-
        this.productService.deleteProductByQuery(this.productOfId).subscribe(data => {
          this.dialogRef.close();
          this.productService.openSnackBar('Đã thành công', 'OK');
        }, error => {
          console.log(error.error);
          this.check = true;
          this.messageErrorIdDelete = 'Không tìm thấy sản phẩm, có dấu hiệu hack hệ thống'
        });
      }
    });

  }


  //____ + ____ + ____ + ____ + ____ + ____
}







