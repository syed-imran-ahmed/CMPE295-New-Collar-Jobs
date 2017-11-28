import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarOneComponent } from './progress-bar-one.component';

describe('ProgressBarOneComponent', () => {
  let component: ProgressBarOneComponent;
  let fixture: ComponentFixture<ProgressBarOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
