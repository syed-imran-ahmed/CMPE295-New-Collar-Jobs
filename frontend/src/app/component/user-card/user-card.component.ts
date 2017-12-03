import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() name: string;
  @Input() location: string;
  @Input() bio: string;
  @Input() userid: Number;
  @Input() buttonText: string;
  @Input() jobTitle: string;
  @Input() quotation: string;

  @Input() imagePath: any;

  expand = false;
  count:number;
  constructor() { }

  ngOnInit() {
    this.count = 0;
  }


  responsePanelClass() {
    //console.log(this.expand);
    const rClass = ['response'];
    if (this.expand) {
      rClass.push('expand');
    }
    // if (this.responseObj.status) {
    //   this.responseObj.status === 200 ?
    //     rClass.push('response-success') :
    //     rClass.push('response-error');
    // }
    return rClass.join(' ');
  }

  onButtonClick() {
    console.log("button clicked");
    this.count++;
    if(this.count%2==1)
    {
      this.expand=true;
    }
    else{
      this.expand=false;
    }

    console.log(this.expand);
  }

  onCandidateSelect(){
    console.log("selected");
  }
}
