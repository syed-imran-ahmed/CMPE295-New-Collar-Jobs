import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {

  jobs: Object[];

  constructor() {

    this.jobs = [
      {
        title: "Software Engineer",
        subtitle: "What did the cheese say when it looked in the mirror?",
        content: "Hello-Me (Halloumi)"
      },
      {
        title: "Test Engineer",
        subtitle: "What kind of cheese do you use to disguise a small horse?",
        content: "Mask-a-pony (Mascarpone)"
      },
      {
        title: "QA Engineer",
        subtitle: "A kid threw a lump of cheddar at me",
        content: "I thought ‘That’s not very mature’"
      },
    ];
   }

  ngOnInit() {
  }

}
