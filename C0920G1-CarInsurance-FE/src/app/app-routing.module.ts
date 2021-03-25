import {EditCustomerComponent} from './client/customer/edit-customer/edit-customer.component';
import {EditPasswordComponent} from './client/customer/edit-password/edit-password.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListContractComponent} from "./client/contract/list-contract/list-contract.component";
import {MaterialModule} from "./material/material.module";
import {CreateContractComponent} from "./client/contract/create-contract/create-contract.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListQuestionComponent} from './question-and-answer/question/list-question/list-question.component';
import {EditQuestionComponent} from './question-and-answer/question/edit-question/edit-question.component';
import {LoginComponent} from "./security/login/login.component";
import {ProfileComponent} from "./security/profile/profile.component";
import {RegisterComponent} from "./security/register/register.component";
import {OtpCustomerComponent} from './client/customer/otp-customer/otp-customer.component';
import {BillDetailComponent} from "./checkout/component/bill-detail/bill-detail.component";
import {SuccessComponent} from "./checkout/component/success/success.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CreateAccidentComponent} from "./client/accident/create-accident/create-accident.component";
import {ListAccidentComponent} from "./client/accident/list-accident/list-accident.component";
import {NewHomePageComponent} from "./client/home/new-home-page/new-home-page.component";
import {QuestionAndAnswerComponent} from "./question-and-answer/question-and-answer.component";
import {OfflineComponent} from "./checkout/component/offline/offline.component";
import {CustomerAuthService} from "./security/customer-auth.service";
import {TestContractDetailComponent} from "./client/accident/test-contract-detail/test-contract-detail.component";

const routes: Routes = [

  //trang
  { component: EditPasswordComponent,canActivate: [CustomerAuthService], path: 'client-edit-password' },
  { component: EditCustomerComponent,canActivate: [CustomerAuthService], path: 'client-edit-customer' },
  { component: OtpCustomerComponent,canActivate: [CustomerAuthService], path: 'client-OTP-customer' },
  // router khanh
  {path: 'list-contract', component: ListContractComponent,canActivate: [CustomerAuthService]},
  {path: 'create-contract', component: CreateContractComponent,canActivate: [CustomerAuthService]},
  { path: 'list-contract', component: ListContractComponent },
  //router homepage
  { path: 'home', component: NewHomePageComponent },
  // Path cua Chien.
  { path: '', component: NewHomePageComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  //Path của linh
  {path: 'qa/list', component: QuestionAndAnswerComponent},
 // path cua phuc
  {path: 'questions', component: ListQuestionComponent},
  {path: 'questions/:id', component: EditQuestionComponent},
  //  cua hiep nhe xin dung xoa
  {path: 'checkout/bill/:id', component: BillDetailComponent},
  {path: 'checkout/success', component: SuccessComponent},
  {path: 'checkout/pay/off', component: OfflineComponent},
//  anh khoa
  {path: 'accident-client', component: ListAccidentComponent,canActivate: [CustomerAuthService]},
  {path: 'contractDetail/:id', component: CreateAccidentComponent,canActivate: [CustomerAuthService]},

  {path: 'accident-client/create',canActivate: [CustomerAuthService], component: CreateAccidentComponent},
  {path: 'accident-client',canActivate: [CustomerAuthService], component: ListAccidentComponent},
  {path: 'test/contractDetail/:id', component: CreateAccidentComponent},
  {path: 'test/contractDetail', component: TestContractDetailComponent},
  {path: 'layout', component: NewHomePageComponent},
  //Path của linh
  {path: 'qa/list', component: QuestionAndAnswerComponent},
  // path cua phuc
  {path: 'questions', component: ListQuestionComponent},
  {path: 'questions/:id', component: EditQuestionComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {
}
