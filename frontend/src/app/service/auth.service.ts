import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private config: ConfigService
  ) { }

  register(user) {
    const body = `username=${user.username}&password=${user.password}&emailid=${user.emailid}&firstname=${user.firstname}&lastname=${user.lastname}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.apiService.post(this.config.register_url, body, headers);
  }

  postjob(data) {
    const body = `title=${data.ques1}&description=${data.ques3}&responsibility=${data.ques4}&location=${data.ques6}&salary=${data.ques5}&traits=${data.ques2}&jobid=${data.jobid}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.apiService.post(this.config.postjob_url, body, headers);
  }

  empRegister(user) {
    const body = `username=${user.username}&password=${user.password}&emailid=${user.emailid}&firstname=${user.firstname}&lastname=${user.lastname}&jobtitle=${user.jobtitle}&companyname=${user.companyname}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.apiService.post(this.config.register_url, body, headers);
  }

  login(user) {
    const body = `username=${user.username}&password=${user.password}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.apiService.post(this.config.login_url, body, headers);
  }

  logout() {
    return this.apiService.post(this.config.logout_url, {})
      .map(() => {
        this.userService.currentUser = null;
      });
  }

  changePassowrd(passwordChanger) {
    return this.apiService.post(this.config.change_password_url, passwordChanger);
  }

  postProfile(imageURL, formOne, formTwo, personalityOne, personalityTwo, personalityThree, personalityFour, motivationOne, motivationTwo, motivationThree, motivationFour){
   
    imageURL = encodeURIComponent(imageURL);
    console.log(imageURL);
    const body = `quotation=${formOne.quotation}&age=${formOne.age}&jobTitle=${formOne.work}&familyStatus=${formOne.marital_status}&personality.introvertExtrovert=${personalityOne}&personality.thinkingFeeling=${personalityTwo}&personality.sensingIntuition=${personalityThree}&personality.judgingPerceiving=${personalityFour}&motivation.incentive=${motivationOne}&motivation.fear=${motivationTwo}&motivation.growth=${motivationThree}&motivation.power=${motivationFour}&imageURL=${imageURL}&frustrations=${formTwo.weakness1+","+formTwo.weakness2+","+formTwo.weakness3+","+formTwo.weakness4+","+formTwo.weakness5}&goals=${formTwo.goal1+","+formTwo.goal2+","+formTwo.goal3+","+formTwo.goal4+","+formTwo.goal5}&bio=${formTwo.bio}`;
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.apiService.post(this.config.user_profile, body, headers);
  }

  applyJob(data)
  {
    const body = `jobid=${data.jobid}&userid=0`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.apiService.post(this.config.apply_url, body, headers);

  }

}
