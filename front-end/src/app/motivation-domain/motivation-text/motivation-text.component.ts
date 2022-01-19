import { Component, OnInit } from '@angular/core';
import { MotivationComponentBase } from '../motivation-component-base.type';
import { MotivationService } from '../motivation.service';

@Component({
  selector: 'd2x-motivation-text',
  templateUrl: './motivation-text.component.html',
  styleUrls: ['./motivation-text.component.scss']
})
export class MotivationTextComponent extends MotivationComponentBase implements OnInit {

  constructor(motivationService: MotivationService) {
    super(motivationService);
  }

  ngOnInit(): void {
  }

}
