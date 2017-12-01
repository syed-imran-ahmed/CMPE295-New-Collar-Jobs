import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-image-dialogue',
  templateUrl: './image-dialogue.component.html',
  styleUrls: ['./image-dialogue.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImageDialogueComponent implements OnInit {

  image: File;
  quote: string;
  firebase: any;
  constructor(private dialogueRef: MatDialogRef<ImageDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('Data is :' + JSON.stringify(this.data));
    this.quote = this.data['quotation'];
    this.firebase = (<any>window).firebase;
  }

  selectFile(event) {
    this.image = event.target.files[0];
  }

  onSave() {
    const patchData = {};
    patchData['ismodified'] = true;
    patchData['quotation'] = this.quote;

    if (this.image) {
      let auth = this.firebase.auth();
      let storageRef = this.firebase.storage().ref();
      let metadata ={
        'contentType' : this.image.type
      };
      storageRef.child('images/' + this.image.name).put(this.image, metadata).then(
        snapshot => {
          console.log(snapshot.metadata);
          const url = snapshot.metadata.downloadURLs[0];
          console.log('file available at' + url);
          patchData['imageURL'] = url;
          this.dialogueRef.close(patchData);
          //we should call our rest service to store file and user correlation
        }).catch(function (error) {
        console.error(error);
      });
    } else {
      this.dialogueRef.close(patchData);
    }
  }

  onCancel() {
    const patchData = {};
    patchData['isModified'] = false;
    this.dialogueRef.close(patchData);
  }
}
