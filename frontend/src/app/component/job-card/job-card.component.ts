import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() content: string;
  expand = false;

  constructor() { }

  ngOnInit() {
  }


  onButtonClick() {
    
  }
}
