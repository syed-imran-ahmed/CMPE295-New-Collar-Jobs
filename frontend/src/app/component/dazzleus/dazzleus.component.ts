import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dazzleus-form',
  templateUrl: './dazzleus.component.html',
  styleUrls: ['./dazzleus.component.css']
})
export class DazzleusComponent implements OnInit {
  file: File[];
  //textField: string;
  firebase: any;
  expand: boolean;

  @Input() title: string;
  @Input() subTitle: string;
  @Input() imgUrl: string;
  @Input() content: string;
  @Input() apiText: string;
  @Input() responseObj: any;

  @Output() apiClick: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.file = [];
    this.firebase = (<any>window).firebase;
    this.expand = false;
    console.log('Printing firebase instance' + this.firebase);
  }

  ngOnInit() {
  }
  onButtonClick() {
   this.expand = !this.expand;
  }


  selectFile(event) {
    console.log(event);
    const fileList: FileList = event.target.files;
    for ( let i = 0; i < fileList.length; i++ ) {
      console.log(fileList[i]);
      this.file.push(fileList[i]);
    }
  }
  onsubmit(form) {
    console.log('logging out form-->' + form.value.comment);
    let auth = this.firebase.auth();
    let storageRef = this.firebase.storage().ref();
    let metadata ={
      'contentType' : this.file[0].type
    };
    storageRef.child('images/'+this.file[0].name).put(this.file[0], metadata).then(
      snapshot=>{
       console.log(snapshot.metadata);
       const url = snapshot.metadata.downloadURLs[0];
       console.log('file available at'+url);
       console.log('comment is'+ form.value.comment);
       //we should call our rest service to store file and user correlation
      }).catch(function (error) {
      console.error(error);
    });

  }
}
