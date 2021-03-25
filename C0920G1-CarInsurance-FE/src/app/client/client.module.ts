import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateCarComponent} from './car/create-car/create-car.component';
import {ListCarComponent} from './car/list-car/list-car.component';
import {CreateCustomerComponent} from './customer/create-customer/create-customer.component';
import {EditCustomerComponent} from './customer/edit-customer/edit-customer.component';
import {CreateContractComponent} from './contract/create-contract/create-contract.component';
import {ListContractComponent} from './contract/list-contract/list-contract.component';
import {CreateAccidentComponent} from './accident/create-accident/create-accident.component';
import {ListAccidentComponent} from './accident/list-accident/list-accident.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {EditPasswordComponent} from './customer/edit-password/edit-password.component';
import {DetailContractComponent} from './contract/detail-contract/detail-contract.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatHorizontalStepper, MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MaterialModule} from "../material/material.module";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {OtpCustomerComponent} from './customer/otp-customer/otp-customer.component';
import {NgxLoadingModule} from "ngx-loading";
import {TestContractDetailComponent} from './accident/test-contract-detail/test-contract-detail.component';
import {LayoutComponent} from './home/layout/layout.component';
import {NewHomePageComponent} from "./home/new-home-page/new-home-page.component";
import {HeaderComponent} from './home/header/header.component';
import {FooterComponent} from './home/footer/footer.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ConfirmComponent} from './customer/confirm/confirm.component';


@NgModule({
  declarations: [CreateCarComponent,
    ListCarComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    CreateContractComponent,
    ListContractComponent,
    CreateAccidentComponent,
    ListAccidentComponent,
    EditPasswordComponent,
    DetailContractComponent,
    NewHomePageComponent,
    OtpCustomerComponent,
    TestContractDetailComponent,
    NewHomePageComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmComponent,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatGridListModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MaterialModule,
    MatSelectModule,
    FlexLayoutModule,
    FormsModule,
    AppRoutingModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    AppRoutingModule,
    NgxLoadingModule,
    MatProgressBarModule
  ],
  exports: [MatHorizontalStepper, NewHomePageComponent, HeaderComponent, FooterComponent]


})
export class ClientModule {
}
