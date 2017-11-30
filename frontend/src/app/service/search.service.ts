import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import {PageEvent} from '@angular/material';

@Injectable()
export class SearchService {
  baseUrl: string = 'https://api.cdnjs.com/libraries';
  queryUrl: string = 'search=';

  searchData: any;
  searchText: any;

  constructor(private http: Http,
    private apiService: ApiService,
    private configService : ConfigService) { }

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term, event?:PageEvent) {
    this.searchText = term; 
    let path:string;
    if(event)
    {
      path =  this.configService.search_jobs + `?page=${event.pageIndex}&size=10`+ `&` + this.queryUrl + term ;
      
    }
    else {
      path =  this.configService.search_jobs + `?page=0&size=10`+ `&` +this.queryUrl + term;
    }
      
    return this.apiService.get(path);

    // return this.http
    //     .get(this.baseUrl + this.queryUrl + term)
    //     .map(res => res.json());
  }
}