import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { compact } from 'lodash';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ExperimentComponent } from './experiment/experiment.component';
import { GoalListComponent } from './goal-domain/goal-list/goal-list.component';
import { GoalComponent } from './goal-domain/goal/goal.component';
import { AppAuthGuard } from './guards/app-auth.guard';
import { HomeComponent } from './home/home.component';
import { ProjectListComponent } from './project-domain/project-list/project-list.component';
import { GoalListResolver } from './resolvers/goal-list.resolver';
import { GoalResolver } from "./resolvers/goal-resolver";
import { ProjectListResolver } from './resolvers/project-list.resolver';
import { TaskItemListResolver } from './resolvers/task-item-list.resolver';
import { TaskItemStatusListResolver } from './resolvers/task-item-status-List-resolver';
import { TaskItemListComponent } from './task-domain/task-item-list/task-item-list.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'experiment', component: ExperimentComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'task-list/:goal-id',
    component: TaskItemListComponent, resolve: { goalList: GoalListResolver, taskItemList: TaskItemListResolver },
    canActivate: [AppAuthGuard]
  },
  {
    path: 'goal/:goal-id',
    component: GoalComponent, resolve: { goal: GoalResolver, taskItemList: TaskItemListResolver, taskItemStatusList: TaskItemStatusListResolver },
    canActivate: [AppAuthGuard]
  },
  {
    path: 'goal-list', component: GoalListComponent, resolve: { goalList: GoalListResolver }, canActivate: [AppAuthGuard]
  },
  {
    path: 'project-list', component: ProjectListComponent, resolve: { projectList: ProjectListResolver }, canActivate: [AppAuthGuard]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

