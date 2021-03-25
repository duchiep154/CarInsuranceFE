import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  public formCreateProduct: FormGroup;
  public carTypes;
  public productTypes;
  public products;
  constructor(
    public formBuilder: FormBuilder,
    public productService: ProductService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.getAllCarType().subscribe((data) => {
      this.carTypes = data;
    });
    this.productService.getAllProductType().subscribe((data) => {
      this.productTypes = data;
    });
    // this.productService.getAllProduct().subscribe((data) => {
    //   this.products = data;
    // });
    this.formCreateProduct = this.formBuilder.group({
      name: [
        '',
        [
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[wsa-zA-ZéẻẽẹêếểễệaáảãạăắẳẵặâấầẩẫóòỏõọôốổỗộơớờởỡúùủũụưứừữửựíìỉĩịýỳỷỹỵÉẺẼẸÊẾỂỄỆAÁẢÃẠĂẮẲẴẶÂẤẦẨẪÓÒỎÕỌÔỐỔỖỘƠỚỜỞỠÚÙỦŨỤƯỨỪỮỬỰÍÌỈĨỊÝỲỶỸỴ-]{1,45}$'
            ),
          ]),
        ],
      ],

      personNumber: [
        '',
        [
          Validators.compose([
            Validators.required,
            Validators.pattern('^[0-9]+$'),
          ]),
        ],
      ],

      carType: [''],

      productType: [''],

      productPrice: [
        '',
        [
          Validators.compose([
            Validators.required,
            Validators.pattern('^[0-9]+$'),
          ]),
        ],
      ],

      statusProduct: ['true'],
    });
  }

  addNewProduct() {
    if (this.formCreateProduct.valid) {
      this.productService
        .addNewProduct(this.formCreateProduct.value)
        .subscribe((data) => {
          this.router.navigateByUrl('employee/product');
          this.openSnackBar('Tạo thành công!','OK');
        });
    } else {
      this.openSnackBar('Vui lòng xem lại thông tin!','OK');
    }
  }

  returnListProduct() {
    this.router.navigateByUrl('employee/product');
  }

  checkName(){
    if (this.products.name == this.formCreateProduct.controls.name){
      return true;
    } else
    return false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

//  ____ + ____ + ____ + ____ + ____ + ____ +
}


