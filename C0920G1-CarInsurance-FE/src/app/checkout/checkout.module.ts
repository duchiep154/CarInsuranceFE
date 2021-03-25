import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {NgxPayPalModule} from "ngx-paypal";
import {MatCardModule} from "@angular/material/card";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    MatCardModule
  ]
})
export class CheckoutModule { }
