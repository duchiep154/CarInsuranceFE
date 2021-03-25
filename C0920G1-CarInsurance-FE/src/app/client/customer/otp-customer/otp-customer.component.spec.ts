import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpCustomerComponent } from './otp-customer.component';

describe('OtpCustomerComponent', () => {
  let component: OtpCustomerComponent;
  let fixture: ComponentFixture<OtpCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
