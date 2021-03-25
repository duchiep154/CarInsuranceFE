import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:C0920G1-CarInsurance-FE/src/app/employee/customer/edit-customer/edit-customer.component.spec.ts
import { EditCustomerComponentEmployee } from './edit-customer.component';

describe('EditCustomerComponent', () => {
  let component: EditCustomerComponentEmployee;
  let fixture: ComponentFixture<EditCustomerComponentEmployee>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustomerComponentEmployee ]
=======
import { OtpEmployeeComponent } from './otp-employee.component';

describe('OtpEmployeeComponent', () => {
  let component: OtpEmployeeComponent;
  let fixture: ComponentFixture<OtpEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpEmployeeComponent ]
>>>>>>> 0a6fcad69cacf58ececaa1321de3ca305b8e30a7:C0920G1-CarInsurance-FE/src/app/employee/employee/otp-employee/otp-employee.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:C0920G1-CarInsurance-FE/src/app/employee/customer/edit-customer/edit-customer.component.spec.ts
    fixture = TestBed.createComponent(EditCustomerComponentEmployee);
=======
    fixture = TestBed.createComponent(OtpEmployeeComponent);
>>>>>>> 0a6fcad69cacf58ececaa1321de3ca305b8e30a7:C0920G1-CarInsurance-FE/src/app/employee/employee/otp-employee/otp-employee.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
