import { TaskItem } from 'src/app/task-domain/task-item/task-item.type';
import { Goal } from '../goal.type';
import { GoalEventType } from "./goal-event.enum";

export class GoalEvent {
  constructor(public goal: Goal, public type: GoalEventType, public taskItem?: TaskItem) { }
}