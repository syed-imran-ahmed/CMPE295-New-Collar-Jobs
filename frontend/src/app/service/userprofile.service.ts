import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {ConfigService} from "./config.service";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserprofileService {

  constructor(private  apiService: ApiService, private config: ConfigService) {
  }

  getProfiles () {
   return  this.apiService.get(this.config.user_profile);
  }

/*  createProfile(profile: string) {
    console.log('Posting Profile' + profile);
    return this.http.post(this.config.user_profile, profile);
  }*/

// /user/profile/{profileid}
  patchProfile(id: string, data: any): Observable<any> {
    console.log('Patching data');
    return this.apiService.patch(this.config.user_profile + '/' + id, data);
  }
}
