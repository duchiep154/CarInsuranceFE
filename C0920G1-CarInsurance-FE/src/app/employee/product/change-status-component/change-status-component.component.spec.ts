import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusComponentComponent } from './change-status-component.component';

describe('ChangeStatusComponentComponent', () => {
  let component: ChangeStatusComponentComponent;
  let fixture: ComponentFixture<ChangeStatusComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStatusComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStatusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
