import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {FormDirective} from "./register/FormDirective";


@NgModule({
  declarations: [
    FormDirective,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})

export class SecurityModule {
}
