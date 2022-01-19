import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GoalEvent } from 'src/app/goal-domain/goal-item/goal-event.type';
import { ProjectEvent } from '../project-item/project-item.component';
import { ProjectService } from '../project.service';
import { Project } from '../project.type';

@Component({
  selector: 'd2x-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  routeData$!: Subscription;
  projectList: Project[] = [];

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.routeData$ = this.route.data.subscribe((data) => {
      this.projectList = data.projectList;
    });
  }

  public goalItemEvent(goalEvent: GoalEvent) {
    //TODO you are loading the whole project list here again
    //this might work for now, and perhaps and you grow the screen, better to just refresh everything
    //TODO do you need switch statment here for each each event
    this.projectService.getProjectList().subscribe(projectList => {
      this.projectList = projectList;
    })
  }

  addProject() {
  }

  projectEvent(event: ProjectEvent) {
  }

  ngOnDestroy(): void {
    this.routeData$?.unsubscribe();
  }
}
