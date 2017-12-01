import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from '../../service';

@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.scss']
})
export class ApplyjobComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ApplyjobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService:AuthService) {      
     }

  onApplyClick(): void {
    console.log(this.data);
    this.authService.applyJob(this.data).subscribe(res=>{
      console.log(res);
    });
    this.dialogRef.close();
  }   

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
