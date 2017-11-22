import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DazzleusComponent } from './dazzleus.component';

describe('DazzleusComponent', () => {
  let component: DazzleusComponent;
  let fixture: ComponentFixture<DazzleusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DazzleusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DazzleusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
