import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-progress-bar-one',
  templateUrl: './progress-bar-one.component.html',
  styleUrls: ['./progress-bar-one.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarOneComponent implements OnInit {

  @Input() first_title: string;
  @Input() last_title: string;
  @Input() width: number;
  //let last-title := null;

  constructor() { }

  ngOnInit() {
  }

}
