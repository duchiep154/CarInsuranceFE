import { TestBed } from '@angular/core/testing';

import { CustomerClientServiceService } from './customer-client-service.service';

describe('CustomerClientServiceService', () => {
  let service: CustomerClientServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerClientServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
