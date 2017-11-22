import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxDialogueComponent } from './textbox-dialogue.component';

describe('TextboxDialogueComponent', () => {
  let component: TextboxDialogueComponent;
  let fixture: ComponentFixture<TextboxDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
