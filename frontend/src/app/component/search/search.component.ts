import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import { Subject } from 'rxjs/Subject';
import {
  SearchService,
  ConfigService
} from '../../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  jobs: {};
  jobsResponse = {};

  length = 100;
  pageSize = 2;
  pageSizeOptions = [5, 10, 25, 100];

  pageEvent: PageEvent;

  constructor(
    private searchService: SearchService,
    private router : Router
  ) { }

  ngOnInit() {
    this.jobs= this.searchService.searchData;
  }

  getSearchData(event?:PageEvent)
  {
    this.searchService.searchEntries(this.searchService.searchText,event)
    .subscribe(results => {
      console.log(results);
      this.jobs = results.content;
      
    });
  }
}

