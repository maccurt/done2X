import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconColorService } from 'src/app/icon.service';
import { Goal } from '../goal.type';

export enum GoalEventType {
  moveToCompleted,
  moveToNotCompleted
}

export class GoalEvent {

  constructor(public goal: Goal, public type: GoalEventType) {


  }

}

@Component({
  selector: 'app-goal-item',
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.scss']
})
export class GoalItemComponent implements OnInit {
  @Input() goal!: Goal;
  @Output() event: EventEmitter<GoalEvent> = new EventEmitter<GoalEvent>();
  constructor(public iconColorService: IconColorService) { }

  ngOnInit(): void {
  }

  moveToCompleted(goal: Goal) {
    this.event.emit(new GoalEvent(goal, GoalEventType.moveToCompleted));
  }

  moveToNotCompleted(goal:Goal){
    this.event.emit(new GoalEvent(goal, GoalEventType.moveToNotCompleted));
  }
}
