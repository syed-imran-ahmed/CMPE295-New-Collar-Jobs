import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class SearchComponent implements OnInit,OnDestroy {

  jobs: {};
  jobsResponse = {};
  searchTxt: string;
  searched = false;

  length = 100;
  pageSize = 2;
  pageSizeOptions = [5, 10, 25, 100];

  pageEvent: PageEvent;

  constructor(
    private searchService: SearchService,
    private router : Router
  ) { }

  ngOnInit() {
    this.searchTxt = this.searchService.searchText;
    
    if(this.searchTxt===undefined || this.searchTxt===''){
      console.log(this.searchTxt);
    }
    else{
      this.searched=true;
    }
    this.jobs= this.searchService.searchData;
    console.log(this.jobs);
  }

  getSearchData(event?:PageEvent)
  {
    if(this.searchTxt===undefined || this.searchTxt===''){
      console.log(this.searchTxt);
    }
    else{
      this.searched=true;
    }
    this.searchService.searchEntries(this.searchService.searchText,event)
    .subscribe(results => {
      this.searchTxt = this.searchService.searchText;
      console.log(results);
      this.jobs = results.content;
      
    });
  }

  ngOnDestroy() {
    
  }
}

