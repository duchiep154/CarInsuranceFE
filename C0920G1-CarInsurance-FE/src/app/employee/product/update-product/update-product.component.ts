import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarType} from "../../../models/product/car-type";
import {ProductType} from "../../../models/product/product-type";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CarTypeService} from "../../../service/car-type.service";
import {ProductTypeService} from "../../../service/product-type.service";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "../../../models/product/product";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  public formUpdateProduct: FormGroup;
  public carTypes: CarType[];
  public productTypes: ProductType[];
  public productOfId: number;
  public product: Product;
  public timesWrongInput = 0;
  public messsageErrors: any;
  public check = false;

  public NAME_REGEX = "^[\\w\\sa-zA-Z0-9éẻẽẹêếểễệaáảãạăắẳẵặâấầẩẫóòỏõọôốổỗộơớờởỡúùủũụưứừữửựíìỉĩịýỳỷỹỵÉẺẼẸÊẾỂỄỆAÁẢÃẠĂẮẲẴẶÂẤẦẨẪÓÒỎÕỌÔỐỔỖỘƠỚỜỞỠÚÙỦŨỤƯỨỪỮỬỰÍÌỈĨỊÝỲỶỸỴ-]{1,45}$";
  public NUMBER_REGEX = "^\\d{1,9}$";
  public STATUS_REGEX = "^(true|false)$";
  public NUMBER_PERSON_REGEX = "^\\d{1,2}$";

  constructor(
    public formBuilder: FormBuilder,
    public productService: ProductService,
    public router: Router,
    public carTypeService: CarTypeService,
    public productTypeService: ProductTypeService,
    public activatedRoute: ActivatedRoute,		// cái này dùng để lấy tham số từ url,
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.productOfId = this.data.dataProduct.id;
    this.carTypeService.getCarTypeList().subscribe(dataOfCarTypes => {
      this.carTypes = dataOfCarTypes;
    });
    this.productTypeService.getProductTypeList().subscribe(dataOfProductTypes => {
      this.productTypes = dataOfProductTypes;
    });

    this.formUpdateProduct = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern(this.NAME_REGEX)]],
      productType: ['', [Validators.required]],
      personNumber: ['', [Validators.required, Validators.pattern(this.NUMBER_PERSON_REGEX)]],
      carType: ['', [Validators.required]],
      productPrice: ['', [Validators.required, Validators.pattern(this.NUMBER_REGEX)]],
      statusProduct: ['', [Validators.required, Validators.pattern(this.STATUS_REGEX)]]
    });

    this.productService.findProductById(this.productOfId).subscribe(dataOfProduct => {
      dataOfProduct.productPrice = Number.parseFloat(dataOfProduct.productPrice);
      this.product = dataOfProduct;
      this.formUpdateProduct.patchValue(dataOfProduct);
    })
  }

  //hieu 2021-03-21
  //tính năng gửi dữ liệu sản phẩm cập nhật về BE
  updateProduct() {
    // nếu nhấn nút update khi các field đều rỗng thì sau 2 lần sẽ đóng dialog
    if (this.formUpdateProduct.value.name == null
      || this.formUpdateProduct.value.productPrice == null
      || this.formUpdateProduct.value.personNumber == null) {
      this.productService.openSnackBar('Vui lòng không để trống', 'NOT');
      this.timesWrongInput += 1;
      if (this.timesWrongInput > 2) {
        this.productService.openSnackBar('Không được gửi dữ liệu trống quá 3 lần', 'NOT');
        this.dialogRef.close();
      } else {
        this.ngOnInit();
      }
    }
    // nếu các field đều chưa thay đổi mà nhấn nút cập nhật 2 lần thì sẽ đóng dialog
    else if (this.product.id == this.formUpdateProduct.value.id
      && this.product.name == this.formUpdateProduct.value.name
      && this.product.productPrice == this.formUpdateProduct.value.productPrice
      && this.product.statusProduct == this.formUpdateProduct.value.statusProduct
      && this.product.carType == this.formUpdateProduct.value.carType
      && this.product.productType == this.formUpdateProduct.value.productType
      && this.product.personNumber == this.formUpdateProduct.value.personNumber
    ) {
      this.productService.openSnackBar('Bạn đã không cập nhật dữ liệu mà vẫn gửi đi', 'NOT');
      this.timesWrongInput += 1;
      if (this.timesWrongInput > 2) {
        this.dialogRef.close();
        this.productService.openSnackBar('Bạn đã không cập nhật dữ liệu mà vẫn gửi đi tới 3 lần', 'NOT');
      } else {
        this.productService.openSnackBar('Vui lòng thay đổi dữ liệu rồi mới nhấn cập nhật', 'NOT');
        this.ngOnInit();
      }
    } else {
      // các trường dữ liệu đều đã validate thì cho phép gởi dữ liệu xuống database để lưu
      // nếu có lỗi validate từ back end thì sẽ có message gởi lên lại front end
      this.formUpdateProduct.value.productPrice = Number.parseFloat(this.formUpdateProduct.value.productPrice);
      this.productService.updateProductByQuery(this.productOfId, this.formUpdateProduct.value).subscribe(productUpdate => {
        this.dialogRef.close();
        this.productService.openSnackBar('Đã thành công', 'OK');
      }, error => {
        console.log(error.error);
        this.check = true;
        this.messsageErrors = error.error;
      });
    }
  }


//____ + ____ + ____ + ____ + ____ + ____
}



// console.log(this.formUpdateProduct.value);
// console.log(productUpdate);
// updateQuestion() {
//   this.loading = true;
//   if (this.formQuestion.valid) {
//     this.questionService.updateQuestionById(this.data.idQ, this.formQuestion.value).subscribe(data => {
//         console.log(data);
//         window.location.reload();
//         this.dialogRef.close();
//       }, error => {
//         if (error.status === 400) {
//           this.listError = error.error;
//         } else if (error.status === 401) {
//           this.router.navigateByUrl("/questions");
//         } else if (error.status === 403) {
//         }
//       }, () => {
//         this.loading = false;
//       }
//     )
//   }
// }
