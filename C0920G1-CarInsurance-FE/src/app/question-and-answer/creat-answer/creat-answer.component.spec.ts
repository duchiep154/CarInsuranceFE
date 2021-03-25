import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatAnswerComponent } from './creat-answer.component';

describe('CreatAnswerComponent', () => {
  let component: CreatAnswerComponent;
  let fixture: ComponentFixture<CreatAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
