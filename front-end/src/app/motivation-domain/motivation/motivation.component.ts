import { Component } from '@angular/core';
import { MotivationComponentBase } from '../motivation-component-base.type';
import { MotivationService } from '../motivation.service';

@Component({
  selector: 'd2x-motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.scss']
})
export class MotivationComponent extends MotivationComponentBase {
  constructor(protected motivationService: MotivationService) {
    super(motivationService);
  }
}