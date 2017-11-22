import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarTwoComponent } from './progress-bar-two.component';

describe('ProgressBarTwoComponent', () => {
  let component: ProgressBarTwoComponent;
  let fixture: ComponentFixture<ProgressBarTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
