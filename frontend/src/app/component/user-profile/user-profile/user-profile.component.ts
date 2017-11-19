import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserprofileService} from "../../../service/userprofile.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {


  profilePhotoUrl:string="http://www.freeiconspng.com/uploads/trump-face-png-21.png";
  profileQuote:string="\"A quotation that captures this person's personality\"";
  age:number=30;
  work:string="Engineer";//jobTitle
  family:string="Single";//familyStatus enum have to map to string values
  location:string="San Jose, CA, USA";// Location class
  character: string="Funny";

  //progressBar-One
  label1:string ="Introvert";
  label2:string ="Extrovert";
  score1:number=10;

  label3:string ="Thinking";
  label4:string ="Feeling";
  score2:number=20;

  label5:string ="Sensing";
  label6:string ="Intuition";
  score3:number=30;

  label7:string ="Judging";
  label8:string ="Perceiving";
  score4:number=70;

  goals: Array<string> = ["A Task that needs to be completed","A Task that needs to be done","no goals in life","just bullshitting"];
  frustrations: Array<string>=["A Task that needs to be completed","A Task that needs to be done","no goals in life","just bullshitting"];
  biodata: string="I am good at bluffing ";

  /*3rd column progress bars*/
  p2label1: string="Incentives";
  p2width1: number=30;

  p2label2: string="Fear";
  p2width2: number=60;

  p2label3: string="Growth";
  p2width3: number=90;

  p2label4: string="Power";
  p2width4: number=75;

  p2label5: string="Social";
  p2width5: number=40;

  /*May not required*/
  p2label6: string="Traditional Ads";
  p2width6: number=40;

  p2label7: string="Online Social Media";
  p2width7: number=40;

  p2label8: string="Referrals";
  p2width8: number=40;

  constructor(private profileService: UserprofileService) { }

  ngOnInit() {
    this.profileService.getProfiles().toPromise().then(
      response => {
        const resp = response.json();
        this.profileQuote = resp['quotation'];
        this.age = parseInt(resp['age'], 10);
        this.work = resp['jobTitle'];
        this.family = resp['familyStatus'];
        const loc = resp['location'];
        this.location = loc['city'] + ', ' + loc['state'] + ', ' +loc['country'];
        const personality = resp['personality'];
        this.score1 = parseInt(personality['introvertExtrovert'], 10);
        this.score2 = parseInt(personality['thinkingFeeling'], 10);
        this.score3 = parseInt(personality['sensingIntuition'], 10);
        this.score4 = parseInt(personality['judgingPerceiving'], 10);

        this.goals = resp['goals'];
        this.frustrations = resp['frustrations'];
        this.biodata = resp['bio'];

        const motivation = resp['motivation'];
        this.p2width1 = motivation['incentive'];
        this.p2width2 = motivation['fear'];
        this.p2width3 = motivation['growth'];
        this.p2width4 = motivation['power'];
        this.p2width5 = motivation['social'];
      }
    ).catch(error => {
      console.log('Error in getting userProfile' + error);
    });
  }

}
