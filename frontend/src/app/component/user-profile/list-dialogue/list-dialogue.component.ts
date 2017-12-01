import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {forEach} from "@angular/router/src/utils/collection";
import {MatCheckboxModule} from '@angular/material/checkbox';

//{title:'', data :'['','','']'}
@Component({
  selector: 'app-list-dialogue',
  templateUrl: './list-dialogue.component.html',
  styleUrls: ['./list-dialogue.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListDialogueComponent implements OnInit {

  listItems: Array<string>;
  item1 : string;
  item2 : string;
  item3 : string;
  item4 : string;
  item5 : string;

  constructor(private dialogueRef : MatDialogRef<ListDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.listItems = this.data['items'];
    this.item1 = this.listItems[0] ? this.listItems[0] : '';
    this.item2 = this.listItems[1] ? this.listItems[1] : '';
    this.item3 = this.listItems[2] ? this.listItems[2] : '';
    this.item4 = this.listItems[3] ? this.listItems[3] : '';
    this.item5 = this.listItems[4] ? this.listItems[4] : '';
  }

  onSave() {
    console.log("Printing modified list"+JSON.stringify(this.listItems));
    let res = {};
    res['title'] = this.data.title;
    res['ismodified'] = true;
    //let items : Array<string>;
    let items =[];
    if (this.item1) {items.push(this.item1); }
    if (this.item2) {items.push(this.item2); }
    if (this.item3) {items.push(this.item3); }
    if (this.item4) {items.push(this.item4); }
    if (this.item5) {items.push(this.item5); }
    res['items'] = items;

    /*let parentData = {'ismodified': true,
      'data':this.data};*/
    this.dialogueRef.close(res);
  }

  onCancel() {
    let parentData = {'ismodified': false,
      'data':this.data};
    this.dialogueRef.close(parentData);
  }
}
