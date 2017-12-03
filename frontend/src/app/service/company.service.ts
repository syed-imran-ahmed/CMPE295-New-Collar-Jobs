import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import {PageEvent} from '@angular/material';

@Injectable()
export class CompanyService {
  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) { }

  getCompany(id:number)
  {
    let path = this.config.get_company+'/'+`${id}`;
    return this.apiService.get(path);
  }

}
