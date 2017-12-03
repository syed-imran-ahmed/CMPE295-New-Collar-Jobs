import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import { Router } from '@angular/router';
import {
  PostedjobService,
  ConfigService,
  UserService
} from '../../service';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {

  jobs: {};
  jobsResponse = {};
  showApplicants=false;
  submitted= false;

  length = 100;
  pageSize = 2;
  pageSizeOptions = [5, 10, 25, 100];

  pageEvent: PageEvent;

  constructor(
    private postedjobService: PostedjobService,
    private router: Router
  ) { }

  ngOnInit() {
    this.submitted = true;
    this.getData();
  }

  getData(event?:PageEvent)
  {
    console.log(event);
    this.postedjobService.getJobs(event)
    .subscribe(res => {
      console.log(res);
      this.jobs = res.content;
      this.submitted = false;
    }, err => {
      this.submitted = false;
      //TODO: spill out the error
    });
  }

  onApplicantsClick(event,jobid){
    this.showApplicants=true;
    console.log(jobid);

    this.router.navigate(['/applicants',jobid]);
  }

}
