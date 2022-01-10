import { Component, Input, OnInit } from '@angular/core';
import { GoalService } from 'src/app/goal-domain/goal.service';
import { Goal } from 'src/app/goal-domain/goal.type';
import { ModalService } from 'src/app/modal.service';
import { Project } from '../project.type';

@Component({
  selector: 'd2x-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project!: Project
  constructor(private modalService: ModalService,
    private goalService: GoalService) { }

  ngOnInit(): void {
  }

  addGoal() {

    this.modalService.goalModal(new Goal(this.project.id)).afterClosed().subscribe((goal) => {
      if (goal) {
        this.goalService.addGoal(goal).subscribe((response) => {
          response.taskCompleted = 0;
          response.taskCount = 0;
          response.taskNotCompleted = 0;
        })
      }
    })
  }
}
