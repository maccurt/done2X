import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../project.type';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  routeData$!: Subscription;
  projectList: Project[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.routeData$ = this.route.data.subscribe((data) => {
      this.projectList = data.projectList;
    });
  }

  ngOnDestroy(): void {
    this.routeData$?.unsubscribe();
  }
}
