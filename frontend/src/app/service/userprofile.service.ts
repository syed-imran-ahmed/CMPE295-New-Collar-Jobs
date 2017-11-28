import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {ConfigService} from "./config.service";

@Injectable()
export class UserprofileService {

  constructor(private http: Http, private config: ConfigService) {
  }

  getProfiles () {
   return  this.http.get(this.config.user_profile);
  }

  createProfile(profile: string) {
    console.log('Posting Profile' + profile);
    return this.http.post(this.config.user_profile, profile);
  }
}
