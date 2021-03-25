import { TestBed } from '@angular/core/testing';

import { AdminAuthService } from './admin-auth.service';

describe('AdminAuthServiceService', () => {
  let service: AdminAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
