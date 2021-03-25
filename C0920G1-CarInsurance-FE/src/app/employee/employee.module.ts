import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateCustomerComponent} from './customer/create-customer/create-customer.component';
import {ListCustomerComponent} from './customer/list-customer/list-customer.component';
import {DetailCustomerComponent} from './customer/detail-customer/detail-customer.component';
import {DeleteCustomerComponent} from './customer/delete-customer/delete-customer.component';
import {ListCarComponent} from './car/list-car/list-car.component';
import {CreateCarComponent} from './car/create-car/create-car.component';
import {CreateContractComponent} from './contract/create-contract/create-contract.component';
import {EditContractComponent} from './contract/edit-contract/edit-contract.component';
import {DeleteContractComponent} from './contract/delete-contract/delete-contract.component';
import {ListContractComponent} from './contract/list-contract/list-contract.component';
import {EditEmployeeComponent} from './admin/edit-employee/edit-employee.component';
import {CreateEmployeeComponent} from './admin/create-employee/create-employee.component';
import {ListEmployeeComponent} from './admin/list-employee/list-employee.component';
import {DeleteEmployeeComponent} from './admin/delete-employee/delete-employee.component';
import {ListAccidentComponent} from './accident/list-accident/list-accident.component';
import {WaitingApprovalComponent} from './accident/list-accident/waiting-approval/waiting-approval.component';
import {NotApprovalComponent} from './accident/list-accident/not-approval/not-approval.component';
import {WasApprovalComponent} from './accident/list-accident/was-approval/was-approval.component';
import { EditCustomerEmployeeComponent } from './customer/edit-customer-employee/edit-customer-employee.component';

import { DetailEmployeeComponent } from './employee/detail-employee/detail-employee.component';
import { ChangePassEmployeeComponent } from './employee/change-pass-employee/change-pass-employee.component';
import { RouterModule } from "@angular/router";
import { ListProductComponent } from "./product/list-product/list-product.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { ChangeStatusComponentComponent } from './product/change-status-component/change-status-component.component';
import { MatDialogModule } from "@angular/material/dialog";
import { CreateProductComponent } from './product/create-product/create-product.component';
import { NgxLoadingModule } from "ngx-loading";
import { MatButtonModule } from "@angular/material/button";
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { EmployeeAdminComponent } from './employee-admin.component';
import {EmployeeRoutingModule} from "./employee-routing.module";

import {MaterialModule} from "../material/material.module";
import {MessageComponent} from "./admin/message/message.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import { OtpEmployeeComponent } from './employee/otp-employee/otp-employee.component';
import {ClientModule} from "../client/client.module";
import { ComfirmComponent } from './admin/comfirm/comfirm.component';
import { DeleteCarComponent } from './car/delete-car/delete-car.component';

import {FocusInvalidElement} from "./admin/edit-employee/FocusInvalidElement";
import {RefundAccidentComponent} from './accident/list-accident/refund-accident/refund-accident.component';
@NgModule({
  declarations: [
    EmployeeAdminComponent,
    CreateCustomerComponent,
    ListCustomerComponent,
    DetailCustomerComponent,
    EditCustomerEmployeeComponent,
    DeleteCustomerComponent,
    ListCarComponent,
    CreateCarComponent,
    CreateContractComponent,
    EditContractComponent,
    DeleteContractComponent,
    ListContractComponent,
    EditEmployeeComponent,
    CreateEmployeeComponent,
    ListEmployeeComponent,
    DeleteEmployeeComponent,
    ListAccidentComponent,
    ListProductComponent,
    DetailEmployeeComponent,
    ChangePassEmployeeComponent,
    EditCustomerEmployeeComponent,
    UpdateProductComponent,
    ChangeStatusComponentComponent,
    CreateProductComponent,
    WaitingApprovalComponent,
    NotApprovalComponent,
    WasApprovalComponent,
    MessageComponent,
    DeleteProductComponent,
    OtpEmployeeComponent,
    ComfirmComponent,
    DeleteCarComponent,
    FocusInvalidElement,
    RefundAccidentComponent,
    ComfirmComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxLoadingModule,
        MatDialogModule,
        MatButtonModule,
        MaterialModule,
        EmployeeRoutingModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        ClientModule,

    ],

  entryComponents: [
    CreateEmployeeComponent
  ],
  exports: []

})
export class EmployeeModule {
}

