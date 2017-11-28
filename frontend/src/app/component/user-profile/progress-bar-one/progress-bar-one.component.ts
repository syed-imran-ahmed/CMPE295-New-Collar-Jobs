import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-progress-bar-one',
  templateUrl: './progress-bar-one.component.html',
  styleUrls: ['./progress-bar-one.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarOneComponent implements OnInit {

  @Input() first_title: string;
  @Input() last_title: string;

  //@Input() width: number;

  @Input() isDisabled: boolean;

  @Output() custchange: EventEmitter<any> = new EventEmitter<any>();

  max = 100;
  min = 0;
  thumbLabel = true;
  @Input() value = 0;

  constructor() { }

  ngOnInit() {
  }

  onInput(event) {
   console.log(event);
   this.custchange.emit(event['value']);
  }
}
