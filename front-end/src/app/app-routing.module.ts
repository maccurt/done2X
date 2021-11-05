import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskItemListComponent } from './task-item-list/task-item-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'task-list', component: TaskItemListComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  
