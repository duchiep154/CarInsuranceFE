import { TestBed } from '@angular/core/testing';

import { OtpCustomerAndEditPasswordService } from './otp-customer-and-edit-password.service';

describe('OtpCustomerAndEditPasswordService', () => {
  let service: OtpCustomerAndEditPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpCustomerAndEditPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
