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
  expand = false;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onEditButtonClick() : void {
    console.log(this.jobid);
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
