import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-progress-bar-two',
  templateUrl: './progress-bar-two.component.html',
  styleUrls: ['./progress-bar-two.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarTwoComponent implements OnInit {

  @Input() label: string;
  @Input() width: number;
  constructor() { }

  ngOnInit() {
  }

}
