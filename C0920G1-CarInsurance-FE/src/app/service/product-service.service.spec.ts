// import { TestBed } from '@angular/core/testing';
//
// import { ProductServiceService } from './product.service';
//
// describe('ProductServiceService', () => {
//   let service: ProductServiceService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ProductServiceService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';


describe('ProductService', () => {

  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
