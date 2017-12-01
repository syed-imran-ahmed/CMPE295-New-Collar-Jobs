import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import { Router } from '@angular/router';
import {
  RecommendedjobsService,
  ConfigService,
  CompanyService,
  UserService
} from '../../service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  jobs: {};
  jobsResponse = {};

  submitted=false;

  length = 300;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  pageEvent: PageEvent;

  constructor(
    private recommendedjobservice: RecommendedjobsService,
    private companyService: CompanyService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getMyInfo().subscribe(user =>{
      console.log(user);
      if(user!=null || user!=''){
        if(user.companyname==null){
          if(user.profileComplete){
            this.getData();
          }
          else{
            this.router.navigate(['/questionnaire']);
          }
        }
    }
    });
   
  }

  getData(event?:PageEvent)
  {
    this.submitted=true;
    this.recommendedjobservice.getJobs(event)
    .delay(500)
    .subscribe(res => {
      this.jobs = res.content;
      this.submitted = false;
      //this.companyService.getCompany(jobs.)


    }, err => {
      this.submitted = false;
      //TODO: spill out the error
    });

}
}
