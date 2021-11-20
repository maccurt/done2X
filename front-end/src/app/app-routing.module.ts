import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalListComponent } from './goal-domain/goal-list/goal-list.component';
import { GoalComponent } from './goal-domain/goal/goal.component';
import { AppAuthGuard } from './guards/app-auth.guard';
import { HomeComponent } from './home/home.component';
import { GoalListResolver } from './resolvers/goal-list.resolver';
import { GoalResolver } from "./resolvers/goal-resolver";
import { TaskItemListResolver } from './resolvers/task-item-list.resolver';
import { TaskItemStatusListResolver } from './resolvers/task-item-status-List-resolver';
import { TaskItemListComponent } from './task-item-list/task-item-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

