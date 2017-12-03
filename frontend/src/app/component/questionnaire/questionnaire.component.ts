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

  image: File;
  //textField: string;
  firebase: any;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  profilePhotoUrl: string = "http://network.napco.com/promo-marketing/wp-content/uploads/sites/12/1969/12/Blank-Headshot.png";
  profileQuote: string = "\"A quotation that captures this person's personality\"";

  status = [
    {value: 'SINGLE', viewValue: 'SINGLE'},
    {value: 'MARRIED', viewValue: 'MARRIED'},
    {value: 'MARRIED_WITH_KIDS', viewValue: 'MARRIED WITH KIDS'},
    {value: 'DIVORCED', viewValue: 'DIVORCED'}
  ];

  traits = [
    {value: 'STREET_SMART', viewValue: 'STREET SMART'},
    {value: 'BOOK_SMART', viewValue: 'BOOK SMART'},
  ];


  personalityOne = 0;
  personalityTwo = 0;
  personalityThree = 0;
  personalityFour = 0;

  motivationOne = 0;
  motivationTwo = 0;
  motivationThree = 0;
  motivationFour = 0;

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

//motivation
  p2label1: string = "Incentives";
  p2width1: number = 30;

  p2label3: string = "Growth";
  p2width3: number = 90;

  p2label4: string = "Power";
  p2width4: number = 75;

  p2label5: string = "Social";
  p2width5: number = 40;



  constructor(private _formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {

    this.userService.getMyInfo().subscribe(user =>{
      if(user!=null || user!=''){
        if(user.companyname==null){
          if(user.profileComplete){
            this.router.navigate(['/user-home'])
          }
          else{
          }
        }
    }
    });
    this.file = [];
    this.firebase = (<any>window).firebase;
    
   }

  ngOnInit() {
    


    this.firstFormGroup = this._formBuilder.group({
      age: ['', Validators.required],
      work: ['', Validators.required],
      marital_status: ['', Validators.required],
      quotation : ['',Validators.required],
      trait_type : ['',Validators.required]
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
    this.image = event.target.files[0];
    let auth = this.firebase.auth();
    let storageRef = this.firebase.storage().ref();
    let metadata ={
      'contentType' : this.image.type
    };
    storageRef.child('images/' + this.image.name).put(this.image, metadata).then(
      snapshot => {
        const url = snapshot.metadata.downloadURLs[0];
       this.profilePhotoUrl = url;
      }).catch(function (error) {
      console.error(error);
    });
  }


  personality1(event) {
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
    this.router.navigate(['/']);  
 },
 error => {
  console.log("error occured in posting user profile");
 });

  }

}
