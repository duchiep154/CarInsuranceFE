import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from "../../service/payment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BillDTO} from "../../model/billDTO";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../../../security/service/token-storage.service";
import {OfflineComponent} from "../offline/offline.component";
import {SuccessComponent} from "../success/success.component";
import {Contract} from "../../../models/contract/contract";
import {ContractService} from "../../../client/contract/contract.service";
import {Observable, Subscription} from "rxjs";
import {ContractDetail} from "../../../models/contract/contract-detail";
import {PayDTO} from "../../model/PayDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import error = CKEDITOR.error;


declare var paypal;

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit {
  public billDTO: BillDTO;
  public idContract: string;
  public statusPay: string;
  public payment: string;
  public paymentType: string;
  public status_pay:string;
  public isPayOffline = false;
  public formBill: FormGroup;
  public checkSubmitPayPal = false;
  public checkButtonPayPal = false;
  private isPayPP: boolean;
  public checkSubmitOffline = false;


  public totalMoney =0;
  public checkButtonPay = false;
  public checkButton = false;
  public checkMessagePaymentSuccess = false;
  private contract: Contract;
  public contractDetail : ContractDetail;
  p
  private contract_id: number;
  private contract_detail_id: any;
  payDTO : PayDTO =new PayDTO()





  constructor(private paymentService: PaymentService,
              private contractService: ContractService,
              private token: TokenStorageService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar
              // @Inject(MAT_DIALOG_DATA) public data: any,

  ) {


  }

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;



  ngOnInit(): void {

   this.getBillDetail();
    paypal
      .Buttons(
      {
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'horizontal',
          label: 'paypal',
          tagline: true,
          height: 50
          // color:  'blue',
          // shape:  'pill',
          // label:  'pay',
          // height: 40
        },
        createOrder: (data, actions) => {
          console.log('createOrder');
          // This function sets up the details of the transaction,
          // including the amount and line item details
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.totalMoney,
                  currency_code: 'USD'
                }
              }
            ]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            console.log('Transaction completed');
            console.log(details);

            this.createBillPaymentByPayPal()

          });
        },
        onError: (data, actions) => {
          console.log('Transaction error');
          // @ts-ignore
          $('#refreshData').click();
        }

      }
    ).render(this.paypalElement.nativeElement);

  }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
      panelClass: [className]
    });
  }


  getBillDetail(){
    this.route.paramMap.subscribe(param => {
      this.idContract = param.get('id');


      this.paymentService.getBillDTO(this.idContract).subscribe((data: BillDTO) => {
        this.billDTO = data;
        this.totalMoney = data.total_money/24000  ;
      }, error => console.log(error),()=>{
        this.formBill=this.fb.group({
          contract_id:[this.billDTO.contract_id],
          customer_name: [this.billDTO.customer_name],
        customer_phone:[this.billDTO.customer_phone],
        customer_email: [this.billDTO. customer_email],
        car_bks: [this.billDTO.car_bks],
        car_year_manufacturing:[this.billDTO.car_year_manufacturing],
        car_manufacturing:[this.billDTO.car_manufacturing],
        contract_start_date: [this.billDTO.contract_start_date],
        contract_duration :[this.billDTO.contract_duration],
        product_name: [this.billDTO.product_name],
        product_type_name: [this.billDTO.product_type_name],
        employee_name: [this.billDTO.employee_name],
        total_money: [this.billDTO.total_money],
        status_approval : [this.billDTO.status_approval],
        payment:[this.billDTO.payment],
        payment_type :[this.billDTO.payment_type],
        status_pay:[this.billDTO.status_pay],
        })
      })
    });
  }

  openMessageOffline() {
    const timeout = 5000;
    const dialogRef = this.dialog.open(OfflineComponent, {
      panelClass: 'app-full-bleed-dialog',
      width: '500px',
      disableClose: false
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });

  }




  // thanh toán bằng paypal
  createBillPaymentByPayPal(): void {
    this.payDTO.id_contract=this.billDTO.contract_id
    console.log(this.payDTO.id_contract)
    this.payDTO.payment=this.billDTO.payment;
    this.payDTO.payment_type=this.billDTO.payment_type ;
    this.payDTO.status_pay=this.billDTO.status_pay;
    this.payDTO.id_contract_detail=this.billDTO.contract_detail_id;

    console.log(this.payDTO)
   this.paymentService.creatBillPaymentPayPal(this.payDTO).subscribe(data=>{
     this.router.navigateByUrl('http://localhost:4200/list-contract');
      // this.payDTO=data;
     this.openSnackBar('đã thanh toán thành công','OK','invalid-snackbar');

    })





  }

  createBillPaymentByOffline(): void {
    console.log(this.billDTO)
    this.payDTO.id_contract=this.billDTO.contract_id
    console.log(this.payDTO.id_contract)
    this.payDTO.payment=this.billDTO.payment;
    this.payDTO.payment_type=this.billDTO.payment_type;
    this.payDTO.status_pay=this.billDTO.status_pay;
    this.payDTO.id_contract_detail=this.billDTO.contract_detail_id;
    console.log(this.billDTO.contract_detail_id);
    console.log(this.payDTO)
    this.paymentService.creatBillPaymentOffline(this.payDTO).subscribe(data=>{
      this.router.navigateByUrl('/');
      // this.payDTO=data;
      this.openSnackBar('đã thanh toán thành công','OK','invalid-snackbar');

    });
  }
  paymentCheckout(): void {


  }

  event($event) {

    const choice = $event.target.value;

    if (choice == 1 ) {
      this.checkButtonPay=true;
      this.checkButtonPayPal=false;
      this.checkButton=true;

      // tslint:disable-next-line:triple-equals
    } else if (choice == 2) {
     this.checkButtonPay=false;
      this.checkButtonPayPal=true;
      this.checkButton=true;

      // tslint:disable-next-line:triple-equals

    } else {
      this.checkButtonPay=false;
      this.checkButtonPayPal=false;
      this.checkButton=false;




    }

  }




}
