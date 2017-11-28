import {Component, Input, Output, OnInit, EventEmitter, ViewEncapsulation} from '@angular/core';
import {MatSliderModule, MatSliderChange} from '@angular/material';

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

  @Output()
  change : EventEmitter<any> = new EventEmitter<any>();

  max = 100;
  min = 0;
  thumbLabel = true;
  value = 0;
  
  constructor() { }

  onInputChange(event: any) {
    this.change.emit(event);
  }

  ngOnInit() {
    
  }

}
