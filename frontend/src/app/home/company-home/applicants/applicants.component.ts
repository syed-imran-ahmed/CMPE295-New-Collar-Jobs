import { Component, OnInit } from '@angular/core';
import { ApiService, ConfigService } from '../../../service';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {

  jobid:number;
  constructor(private apiService: ApiService,
  private configService:ConfigService,
  private route: ActivatedRoute) { 

    this.jobid = this.route.snapshot.params['id'];
  }

  submitted = false;
  users=[];


  ngOnInit() {
    this.submitted = true;
   let path = this.configService.get_applicants+this.jobid+'/applications';
   console.log(path);
    this.apiService.get(this.configService.get_applicants+this.jobid+'/applications').subscribe(res=>{
      for (let entry of res) {
        if(entry.userProfile!==null){
          this.users.push(entry.userProfile);
        }
        else{
          
        }
    }
      console.log(this.users)
      this.submitted = false;
    });

  }

}
