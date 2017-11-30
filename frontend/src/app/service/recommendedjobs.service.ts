import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import {PageEvent} from '@angular/material';

@Injectable()
export class RecommendedjobsService {
  
  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) { }

  getJobs(event?:PageEvent) {
    let path:string;
    if(event)
    {
      path =  this.config.recommended_jobs + `?page=${event.pageIndex}&size=10`;
    }
    else {
      path =  this.config.recommended_jobs + `?page=0&size=10`;
    }
    
    return this.apiService.get(path);
  }

  getJob(id:number)
  {
    let path = this.config.postjob_url+'/'+`${id}`;
    return this.apiService.get(path);
  }

}
