import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  //progressBar-One
  test1:string ="test1";
  test2:string ="test2";

  profilePhotoUrl:string="http://www.freeiconspng.com/uploads/trump-face-png-21.png";
  profileQuote:string="\"A quotation that captures this person's personality\"";
  age:number=30;
  work:string="";//jobTitle
  family:string="";//familyStatus enum have to map to string values
  location:string="";// Location class

  constructor() { }

  ngOnInit() {
  }

}
