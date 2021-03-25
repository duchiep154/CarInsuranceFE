import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccidentClientService} from "../../../api-service/accident-client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ContractDetail} from "../../../models/contract/contract-detail";
import {Customer} from "../../../models/customer/customer";
import {Contract} from "../../../models/contract/contract";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {Accident} from "../../../models/contract/accident";
import {TokenStorageService} from "../../../security/service/token-storage.service";



@Component({
  selector: 'app-create-accident',
  templateUrl: './create-accident.component.html',
  styleUrls: ['./create-accident.component.scss']
})
export class CreateAccidentComponent implements OnInit {
  imgSrc: string = '';
  check = false;
  flag = true;
  fb;
  downloadURL: Observable<string>;


  public formCreateAccident:FormGroup;
  public contractDetail = new ContractDetail();
  public customer = new Customer();
  public contract = new Contract();
  public contractId: number;
  public customerId: number;
  public customerName: String;
  public customerAddress: String;
  public numberPlate: String;
  public contractDetailId: number;

  public listError = new Accident();


  constructor(private formBuilder: FormBuilder,
              private accidentService: AccidentClientService,
              private router: Router,
              private storage: AngularFireStorage,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getContractDetailById();
    this.formCreateAccident = this.formBuilder.group({
      contractDetail:[''],
      reason: ['',Validators.required],
      img: [''],
    });
  };



  addListAccident(){
    this.formCreateAccident.controls.img.setValue(this.fb);
    this.formCreateAccident.controls.contractDetail.setValue(this.contractDetail);
    this.accidentService.addListAccident(this.formCreateAccident.value).subscribe(data => {
      this.router.navigateByUrl('accident-client')
    }, error =>{
      if (error.status === 400) {
        this.listError = error.error;
        console.log(this.listError)
      }else if (error.status === 401) {
      }else if (error.status === 403) {
      }
    })
  }

  getContractDetailById(){
    this.activatedRoute.params.subscribe(data => {
      this.contractDetailId = data.id;
      this.accidentService.getContractDetailById(this.contractDetailId).subscribe(data1 => {
        this.contractDetail = data1;
        this.customerName = data1.contract.car.customer.users.username;
        if (this.tokenStorageService.getUser().username != this.customerName ){
          this.router.navigateByUrl("");

        }
      });
    });
  }

  // getContractDetailById(){
  //   this.accidentService.getContractDetailById(1).subscribe(data =>{
  //     console.log(data);
  //     this.contractDetail = data;
  //   },() => {
  //
  //   }, () => {
  //     this.contractId = this.contractDetail.contract.id;
  //     this.customerId = this.contractDetail.contract.car.customer.id;
  //     this.customerName = this.contractDetail.contract.car.customer.name;
  //     this.customerAddress = this.contractDetail.contract.car.customer.address;
  //     this.customerAddress = this.contractDetail.contract.paymentOption;
  //     this.numberPlate = this.contractDetail.contract.car.numberPlate;
  //     this.numberPlate = this.contractDetail.contract.car.cardIdNumber;
  //   })
  // }

  showImg() {
    document.getElementById('imgUrl').click();
  }

  getLinkImg(event) {
    this.check = true;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        (<HTMLImageElement> document.getElementById('img-accident')).src = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  // createFileBase() {
  //   if (this.formCreateAccident.controls.img.value != this.imgSrc) {
  //     const filePath = `accident/${this.selectImg.name}_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe((img) => {
  //           console.log(img);
  //           this.formCreateAccident.controls.img.setValue(img);
  //           this.accidentService.addListAccident(this.formCreateAccident.value).subscribe(next => {
  //             this.router.navigate(['accident-client']);
  //           });
  //         })
  //       })
  //     ).subscribe();
  //   }else {
  //     this.formCreateAccident.controls.img.setValue(this.imgSrc);
  //     this.accidentService.addListAccident(this.formCreateAccident.value).subscribe(next => {
  //       this.router.navigate(['accident-client']);
  //     });
  //   }
  // }


  onFileSelected(event) {
    this.check = false;
    this.getLinkImg(event);
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `accident/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`accident/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
