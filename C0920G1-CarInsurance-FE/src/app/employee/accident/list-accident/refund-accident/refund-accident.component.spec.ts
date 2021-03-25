import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundAccidentComponent } from './refund-accident.component';

describe('RefundAccidentComponent', () => {
  let component: RefundAccidentComponent;
  let fixture: ComponentFixture<RefundAccidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundAccidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
