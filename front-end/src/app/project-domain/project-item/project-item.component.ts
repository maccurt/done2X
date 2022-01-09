import { Component, Input, OnInit } from '@angular/core';
import { ProjectListResolver } from 'src/app/resolvers/project-list.resolver';
import { Project } from '../project.type';

@Component({
  selector: 'd2x-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project!: Project
  constructor() { }

  ngOnInit(): void {
  }

}
