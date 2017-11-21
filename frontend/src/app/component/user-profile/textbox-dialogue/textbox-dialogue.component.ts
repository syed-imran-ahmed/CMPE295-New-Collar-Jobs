import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-textbox-dialogue',
  templateUrl: './textbox-dialogue.component.html',
  styleUrls: ['./textbox-dialogue.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TextboxDialogueComponent implements OnInit {

  text: string;
  constructor(private dialogueRef: MatDialogRef<TextboxDialogueComponent>, @Inject(MAT_DIALOG_DATA) private data: string) { }

  ngOnInit() {

  }

  onSave(){
    console.log("Saved now have to make a rest call to put or patch");
    let parentData = {'ismodified': true,
    'data':this.data};
    this.dialogueRef.close(parentData);
  }

  onCancel() {
    let parentData = {'ismodified': false,
      'data':this.data};
    this.dialogueRef.close(parentData);
  }
}
