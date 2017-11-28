import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserprofileService} from "../../../service/userprofile.service";
import { TextboxDialogueComponent } from '../textbox-dialogue/textbox-dialogue.component';
import {MatDialog} from '@angular/material';
import {ListDialogueComponent} from "../list-dialogue/list-dialogue.component";
import {ImageDialogueComponent} from "../image-dialogue/image-dialogue.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {

  firebase: any;
  image: File;
  isPesonalityEditable : boolean;

  id: string;
  profilePhotoUrl: string = "http://www.freeiconspng.com/uploads/trump-face-png-21.png";
  profileQuote: string = "\"A quotation that captures this person's personality\"";
  age: number = 30;
  work: string = "Engineer";//jobTitle
  family: string = "Single";//familyStatus enum have to map to string values
  location: string = "San Jose, CA, USA";// Location class
  character: string = "Funny";

  //progressBar-One
  label1: string = "Introvert";
  label2: string = "Extrovert";
  score1: number;

  label3: string = "Thinking";
  label4: string = "Feeling";
  score2: number;

  label5: string = "Sensing";
  label6: string = "Intuition";
  score3: number;

  label7: string = "Judging";
  label8: string = "Perceiving";
  score4: number;

  goals: Array<string> = ["A Task that needs to be completed", "A Task that needs to be done", "no goals in life", "just bullshitting"];
  frustrations: Array<string> = ["A Task that needs to be completed", "A Task that needs to be done", "no goals in life", "just bullshitting"];
  biodata: string = "I am good at bluffing ";

  /*3rd column progress bars*/
  p2label1: string = "Incentives";
  p2width1: number = 30;

  p2label2: string = "Fear";
  p2width2: number = 60;

  p2label3: string = "Growth";
  p2width3: number = 90;

  p2label4: string = "Power";
  p2width4: number = 75;

  p2label5: string = "Social";
  p2width5: number = 40;

  /*May not required*/
  p2label6: string = "Traditional Ads";
  p2width6: number = 40;

  p2label7: string = "Online Social Media";
  p2width7: number = 40;

  p2label8: string = "Referrals";
  p2width8: number = 40;

  /* dialogue for editing*/

  constructor(private profileService: UserprofileService, private mydialogue: MatDialog) {
  }

  ngOnInit() {
    this.firebase = (<any>window).firebase;
    this.isPesonalityEditable = false;
    this.profileService.getProfiles().toPromise().then(
      response => {
        console.log("Logging the response from GET /user/profile"+response);
        const resp = response;
        console.log("Logging the response from GET /user/profile"+resp);
        this.id = resp['id'];
        this.profilePhotoUrl = resp['imageURL'];
        this.profileQuote = resp['quotation'];
        this.age = parseInt(resp['age'], 10);
        this.work = resp['jobTitle'];
        this.family = resp['familyStatus'];
        const loc = resp['location'];
        this.location = loc['city'] + ', ' + loc['state'] + ', ' + loc['country'];
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

  openDialogue(title : string) {
    console.log("I am clicked for opening dialogue");
    let custdata = {};
    custdata['title'] = title;
    custdata['data'] = this.biodata;
    let dialogHandle = this.mydialogue.open(TextboxDialogueComponent,{
      'width': '400px',
      'data': custdata
    });

    dialogHandle.afterClosed().subscribe(result=>{
      console.log('dialogue closed ' + result);
      //assign result to this.biodata
      if(result['ismodified']) {
        const patchDoc = {'bio': result.data['data']};
        this.profileService.patchProfile(this.id, patchDoc).toPromise().then(response => {
          console.log('Patching response' + response);
          console.log('Patching response' + response.json());
          //if success in patching update the dom
          this.biodata = result.data['data'];
        }).catch(error => {console.log('Error is Patching ' + error ); });
      }
    });
  }
//// {title:'', items :'['','','']'}
  openListDialogue(type:string) {
    //const type = 'goals';
    let data = {};
    data['title'] = type;
    if(type === 'goals') {
      data['items'] = this.goals;
    } else if (type === 'frustrations') {
      data['items'] = this.frustrations;
    }
    let dialogHandle = this.mydialogue.open(ListDialogueComponent,
      { 'width':'400px',
                'data': data
    });

    dialogHandle.afterClosed().subscribe(result => {
      console.log("------->"+ JSON.stringify(result));
      if(result['ismodified']) {
        if(result['title']==='goals') {
          console.log(result['items']);
          this.goals = result['items'];
        } else if(result['title'] ==='frustrations') {
          this.frustrations = result['items'];
          console.log(result['items']);
        }
      }
    });
  }

  uploadPicture() {
    console.log('I am clicked');
    const data = {};
    data['title'] = 'Upload Picture';
    data['quotation'] = this.profileQuote;
    let dialogueHandle = this.mydialogue.open(ImageDialogueComponent, {'width': '400px',
    'data': data });

    dialogueHandle.afterClosed().subscribe(result => {
      if (result['ismodified']) {
          const patch = {};
          if (result['imageURL']) {
            patch['imageURL'] = result['imageURL'];
          }

          if (result['quotation']) {
            patch['quotation'] = result['quotation'];
          }
          this.profileService.patchProfile(this.id, patch).toPromise().then( res => {
            if (result['imageURL']) { this.profilePhotoUrl = result['imageURL']; }
            if (result['quotation']) { this.profileQuote = result['quotation']; }
          }).catch( error => {
            console.log('Error in Patching' + error);
          });
      }
    });
  }

  previewImage(event) {
    const patchData = {};
    this.image = event.target.files[0];
    let auth = this.firebase.auth();
    let storageRef = this.firebase.storage().ref();
    let metadata ={
      'contentType' : this.image.type
    };
    storageRef.child('images/' + this.image.name).put(this.image, metadata).then(
      snapshot => {
        console.log(snapshot.metadata);
        const url = snapshot.metadata.downloadURLs[0];
        console.log('file available at' + url);
        patchData['imageURL'] = url;
        //we should call our rest service to store file and user correlation
        this.profileService.patchProfile(this.id, patchData).toPromise().then( reply => {
          this.profilePhotoUrl = url;
        }).catch(err => {
          console.log("Error while patching profile photo");
        });
      }).catch(function (error) {
      console.error(error);
    });
  }

  editPersonality() {
    this.isPesonalityEditable = !(this.isPesonalityEditable);
    if (!this.isPesonalityEditable) {
     const request = {};
     const personality = {};
     personality['introvertExtrovert'] = this.score1;
     personality['thinkingFeeling'] =  this.score2;
     personality['sensingIntuition'] = this.score3;
     personality['judgingPerceiving'] = this.score4;
     request['personality'] = personality;
     console.log(JSON.stringify(request));
     this.profileService.patchProfile(this.id, request).toPromise().then( res => {
       console.log(res);
     }).catch(err => {
       console.log('Error while updating Personalities' + err);
     });
    }
  }

  updatePersonality(event, label) {
    this[label] = parseInt(event,10);
  }
}


/*this.score1 = parseInt(personality['introvertExtrovert'], 10);
this.score2 = parseInt(personality['thinkingFeeling'], 10);
this.score3 = parseInt(personality['sensingIntuition'], 10);
this.score4 = parseInt(personality['judgingPerceiving'], 10);*/
