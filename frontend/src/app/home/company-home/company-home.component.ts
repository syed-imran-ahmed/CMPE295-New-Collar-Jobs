import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
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

  length = 100;
  pageSize = 2;
  pageSizeOptions = [5, 10, 25, 100];

  pageEvent: PageEvent;

  constructor(
    private postedjobService: PostedjobService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(event?:PageEvent)
  {
    console.log(event);
    this.postedjobService.getJobs(event)
    .subscribe(res => {
      console.log(res);
      this.jobs = res.content;
    }, err => {
      //TODO: spill out the error
    });
  }

}
