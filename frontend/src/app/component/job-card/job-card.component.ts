import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PostjobComponent } from '../postjob';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() content: string;
  @Input() jobid: Number;
  @Input() buttonText: string;
  @Input() responseObj: any;

  isCompany= false;
  count: number;

  expand = false;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.count = 0;
    console.log("initial count "+this.count);
    if(this.buttonText==="Edit")
    {
      this.isCompany = true;
    }
  }

  onButtonClick(){
    

    console.log(this.jobid);
    this.count++;
    //console.log("inside button count "+this.count);
    if(this.count%2==1)
    {
      this.expand=true;
    }
    else{
      this.expand=false;
    }


    
  }

  onEditButtonClick() : void {
  if(this.isCompany){
    let dialogRef = this.dialog.open(PostjobComponent, {
      width: '1000px',
      height: '600px',
      data: {isModel:1,jobId:this.jobid}

      //data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}

responsePanelClass() {
  const rClass = ['response'];
  if (this.expand) {
    rClass.push('expand');
  }
  // if (this.responseObj.status) {
  //   this.responseObj.status === 200 ?
  //     rClass.push('response-success') :
  //     rClass.push('response-error');
  // }
  return rClass.join(' ');
}
}
