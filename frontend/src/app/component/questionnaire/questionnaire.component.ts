import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {
  UserService,
  AuthService,
} from '../../service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionnaireComponent implements OnInit {

  file: File[];
  //textField: string;
  firebase: any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  profilePhotoUrl: string = "http://network.napco.com/promo-marketing/wp-content/uploads/sites/12/1969/12/Blank-Headshot.png";
  profileQuote: string = "\"A quotation that captures this person's personality\"";

  status = [
    {value: 'SINGLE', viewValue: 'SINGLE'},
    {value: 'MARRIED', viewValue: 'MARRIED'},
    {value: 'MARRIED_WITH_KIDS', viewValue: 'MARRIED_WITH_KIDS'},
    {value: 'DIVORCED', viewValue: 'DIVORCED'}
  ];


  personalityOne: any;
  personalityTwo: any;
  personalityThree: any;
  personalityFour: any

  motivationOne: any;
  motivationTwo: any;
  motivationThree: any;
  motivationFour: any;

  //progressBar-One
  label1: string = "Introvert";
  label2: string = "Extrovert";
  score1: number = 10;

  label3: string = "Thinking";
  label4: string = "Feeling";
  score2: number = 20;

  label5: string = "Sensing";
  label6: string = "Intuition";
  score3: number = 30;

  label7: string = "Judging";
  label8: string = "Perceiving";
  score4: number = 70;


  constructor(private _formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.file = [];
    this.firebase = (<any>window).firebase;
    
   }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      age: ['', Validators.required],
      work: ['', Validators.required],
      marital_status: ['', Validators.required],
      quotation : ['',Validators.required],
      persona1: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      goal1: ['', Validators.required],
      goal2: ['', Validators.required],
      goal3: [''],
      goal4: [''],
      goal5: [''],

      weakness1: ['', Validators.required],
      weakness2: ['', Validators.required],
      weakness3: [''],
      weakness4: [''],
      weakness5: [''],

      bio: ['', Validators.required]

    });
  }

  selectFile(event) {
    const fileList: FileList = event.target.files;
    for ( let i = 0; i < fileList.length; i++ ) {
      console.log(fileList[i]);
      this.file.push(fileList[i]);
    }

    //console.log('logging out form-->' + form.value.comment);
    let auth = this.firebase.auth();
    let storageRef = this.firebase.storage().ref();
    let metadata ={
      'contentType' : this.file[0].type
    };
    storageRef.child('images/'+this.file[0].name+'?random+\=' + Math.random()).put(this.file[0], metadata).then(
      snapshot=>{
       //console.log(snapshot.metadata);
       const url = snapshot.metadata.downloadURLs[0];
       this.profilePhotoUrl = url;
       console.log('file available at '+url);
       event.target.value = '';
       //console.log('comment is'+ form.value.comment);
       //we should call our rest service to store file and user correlation
      }).catch(function (error) {
      console.error(error);
    });
  }


  personality1(event) {
    //console.log(event.value);
    this.personalityOne = event.value;
  }
  personality2(event) {
    this.personalityTwo = event.value;
  }
  personality3(event) {
    this.personalityThree = event.value;
  }
  personality4(event) {
    this.personalityFour = event.value;
  }
 

motivation1(event){
  this.motivationOne = event.value;
}
motivation2(event){
  this.motivationTwo = event.value;
}
motivation3(event){
  this.motivationThree = event.value;
}
motivation4(event){
  this.motivationFour = event.value;
}


onSubmit() {
  this.authService.postProfile(this.profilePhotoUrl, this.firstFormGroup.value,
    this.secondFormGroup.value,
    this.personalityOne,
    this.personalityTwo,
    this.personalityThree,
    this.personalityFour,
    this.motivationOne,
    this.motivationTwo,
    this.motivationThree,
    this.motivationFour
  )
  // show me the animation
 .delay(1000)
 .subscribe(data => {
    console.log("user profile successfully posted");
    this.router.navigate(['/']);  
   
 
 },
 error => {
  console.log("error occured in posting user profile");
 });

  }

}
