import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-progress-bar-one',
  templateUrl: './progress-bar-one.component.html',
  styleUrls: ['./progress-bar-one.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarOneComponent implements OnInit {

  @Input() first_title: string;
  @Input() last_title: string;
  @Input() width: number;

  max = 100;
  min = 0;
  thumbLabel = true;
  value = 0;

  constructor() { }

  ngOnInit() {
  }

}
