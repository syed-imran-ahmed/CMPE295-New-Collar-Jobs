import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import {
  RecommendedjobsService,
  ConfigService
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

  length = 100;
  pageSize = 2;
  pageSizeOptions = [5, 10, 25, 100];

  pageEvent: PageEvent;

  constructor(
    private recommendedjobservice: RecommendedjobsService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(event?:PageEvent)
  {
    this.submitted=true;
    this.recommendedjobservice.getJobs(event)
    .delay(500)
    .subscribe(res => {
      this.jobs = res.content;
      this.submitted = false;
    }, err => {
      this.submitted = false;
      //TODO: spill out the error
    });

}
}
