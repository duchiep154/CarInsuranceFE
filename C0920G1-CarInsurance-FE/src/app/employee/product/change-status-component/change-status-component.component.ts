import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';             // hieu change status
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-change-status-component',
  templateUrl: './change-status-component.component.html',
  styleUrls: ['./change-status-component.component.scss']
})
export class ChangeStatusComponentComponent implements OnInit {
  public productName;
  public productId;
  public messageErrorId: string;
  public check = false;

  constructor(
    public productService: ProductService,
    public dialogRef: MatDialogRef<ChangeStatusComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.productName = this.data.dataProduct.name;
    this.productId = this.data.dataProduct.id;
  }

  // hieu change status
  changeStatusProduct(){
    this.productService.changeStatusProduct(this.productId).subscribe(data => {
      this.dialogRef.close();
      this.productService.openSnackBar('Đã thành công', 'OK');
    }, error => {
      console.log(error.error);
      this.check = true;
      this.messageErrorId = 'Không tìm thấy, có dấu hiệu hack hệ thống';
    },
    )
  }

// ____ + ____ + ____ + ____ + ____
}



