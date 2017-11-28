import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogueComponent } from './image-dialogue.component';

describe('ImageDialogueComponent', () => {
  let component: ImageDialogueComponent;
  let fixture: ComponentFixture<ImageDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
