import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoalService } from 'src/app/goal-domain/goal.service';
import { Goal } from 'src/app/goal-domain/goal.type';
import { ModalService } from 'src/app/modal.service';
import { Project } from '../project.type';
export class ProjectEvent {
  constructor(public project: Project, public eventType: ProjectEvenType) { }
  goal!: Goal;
}

export enum ProjectEvenType {
  goalAdded,
}

@Component({
  selector: 'd2x-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent {

  @Input() project!: Project
  @Output() event: EventEmitter<ProjectEvent> = new EventEmitter<ProjectEvent>();
  constructor(private modalService: ModalService,
    private goalService: GoalService) { }

  addGoal() {

    this.modalService.goalModal(new Goal(this.project.id)).afterClosed().subscribe((goal) => {
      if (goal) {
        this.goalService.addGoal(goal).subscribe((response) => {
          response.taskCompleted = 0;
          response.taskCount = 0;
          response.taskNotCompleted = 0;
          this.project.goalCount += 1;
          this.project.goalNotCompleted += 1;

          const event = new ProjectEvent(this.project, ProjectEvenType.goalAdded);
          event.goal = response;
          this.event.emit(event);
        });
      }
    });
  }
}