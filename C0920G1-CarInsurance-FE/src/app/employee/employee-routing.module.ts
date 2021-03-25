import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListAccidentComponent} from "./accident/list-accident/list-accident.component";
import {EmployeeAdminComponent} from "./employee-admin.component";
import {EditEmployeeComponent} from "./admin/edit-employee/edit-employee.component";
import {ListEmployeeComponent} from "./admin/list-employee/list-employee.component";
import {CreateEmployeeComponent} from "./admin/create-employee/create-employee.component";
import {DetailEmployeeComponent} from "./employee/detail-employee/detail-employee.component";
import {ChangePassEmployeeComponent} from "./employee/change-pass-employee/change-pass-employee.component";
import {ListProductComponent} from "./product/list-product/list-product.component";
import {CreateProductComponent} from "./product/create-product/create-product.component";
import {ChangeStatusComponentComponent} from "./product/change-status-component/change-status-component.component";
import {UpdateProductComponent} from "./product/update-product/update-product.component";
import {DeleteCustomerComponent} from "./customer/delete-customer/delete-customer.component";
import {ListCustomerComponent} from "./customer/list-customer/list-customer.component";
import {CreateCustomerComponent} from "./customer/create-customer/create-customer.component";
import {ListCarComponent} from "./car/list-car/list-car.component";
import {CreateCarComponent} from "./car/create-car/create-car.component";
import {OtpEmployeeComponent} from "./employee/otp-employee/otp-employee.component";
import {EditContractComponent} from "./contract/edit-contract/edit-contract.component";
import {ListContractComponent} from "./contract/list-contract/list-contract.component";
import {CreateContractComponent} from "./contract/create-contract/create-contract.component";
import {AdminAuthService} from "../security/admin-auth.service";
import { EditCustomerEmployeeComponent } from './customer/edit-customer-employee/edit-customer-employee.component';
import {DetailCustomerComponent} from "./customer/detail-customer/detail-customer.component";
import {RefundAccidentComponent} from "./accident/list-accident/refund-accident/refund-accident.component";

const routes: Routes = [
  {
    //Chiến phân quyền FE .
    path: 'admin', component: EmployeeAdminComponent,canActivate: [AdminAuthService], children: [
      {
        path: 'employee', children: [
          // path cua hung
          {path: 'update/:id', component: EditEmployeeComponent},
          {path: 'contract/updateContract/:id', component: EditContractComponent},
          // path cua tuan
          {path: 'list', component: ListEmployeeComponent},
          {path: '', component: ListEmployeeComponent},
          {path: 'create', component: CreateEmployeeComponent},
        ]
      }
    ]
  },
  {
    path: 'employee', component: EmployeeAdminComponent,canActivate: [AdminAuthService], children: [
      //path cua cuong
      {path: 'refund/:id', component: RefundAccidentComponent},
      //path cua quoc bao
      {path: 'accident',canActivate: [AdminAuthService], component: ListAccidentComponent},
      // path cua nhan
      {path: 'detail/:id',canActivate: [AdminAuthService], component: DetailEmployeeComponent},
      {path: 'changepass/:id',canActivate: [AdminAuthService], component: ChangePassEmployeeComponent},
      {path: 'OTP',canActivate: [AdminAuthService], component: OtpEmployeeComponent},
      // router cua thinh
      {
        path: 'product', children: [
          {path: '',canActivate: [AdminAuthService], component: ListProductComponent},
          {path: 'create',canActivate: [AdminAuthService], component: CreateProductComponent},
          // router cua hieu
          {path: 'product-change-status',canActivate: [AdminAuthService], component: ChangeStatusComponentComponent},
          // phai co /:id moi truyen id len url duoc
          {path: 'product-update/:id',canActivate: [AdminAuthService], component: UpdateProductComponent},
        ]
      },
      //path of nguyen bao
      { path: 'customer-edit/:id', component: EditCustomerEmployeeComponent },
      { path: 'customer-delete/:id', component: DeleteCustomerComponent },
      { path: 'customer-edit/:id',canActivate: [AdminAuthService], component: EditCustomerEmployeeComponent },
      { path: 'customer-delete/:id',canActivate: [AdminAuthService], component: DeleteCustomerComponent },
      // path of the anh
      {path: 'customers-list',component:ListCustomerComponent},
      {path: 'customers-create',component:CreateCustomerComponent},
      {path: 'customers-detail',component:DetailCustomerComponent},
      {path: 'cars-list',component:ListCarComponent},
      {path: 'cars-create',component:CreateCarComponent},
      {path: 'customers-list',canActivate: [AdminAuthService],component:ListCustomerComponent},
      {path: 'customers-create',canActivate: [AdminAuthService],component:CreateCustomerComponent},
      {path: 'cars-list',canActivate: [AdminAuthService],component:ListCarComponent},
      {path: 'cars-create',canActivate: [AdminAuthService],component:CreateCarComponent},
      // path contract of tuan
      {path: 'contract',canActivate: [AdminAuthService], component: ListContractComponent},
      {path: 'contract-create',canActivate: [AdminAuthService], component: CreateContractComponent}
    ]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeeRoutingModule {
}
