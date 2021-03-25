//Khanh//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatHorizontalStepper, MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChangeStatusComponentComponent} from "../employee/product/change-status-component/change-status-component.component";
import {DeleteProductComponent} from "../employee/product/delete-product/delete-product.component";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule
  ], exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatHorizontalStepper,
    BrowserAnimationsModule

  ], providers: [MatSnackBar, MatDatepickerModule ],     // hieu change status
  entryComponents: [
    ChangeStatusComponentComponent,
    DeleteProductComponent
  ]   // hieu change status và delete product


})
export class MaterialModule { }
//Khanh//
