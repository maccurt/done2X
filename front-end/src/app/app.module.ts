import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskItemListComponent } from './task-domain/task-item-list/task-item-list.component';
import { TaskItemComponent } from './task-domain/task-item/task-item.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskItemModalComponent } from './task-domain/task-item-modal/task-item-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { GoalListResolver } from './resolvers/goal-list.resolver';
import { TaskItemListResolver } from './resolvers/task-item-list.resolver';
import { SecurityModule } from './security-routing-module';
import { GoalListComponent } from './goal-domain/goal-list/goal-list.component';
import { GoalModalComponent } from './goal-domain/goal-modal/goal-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BreakPointTesterComponent } from './break-point-tester/break-point-tester.component';
import { GoalComponent } from './goal-domain/goal/goal.component';
import { GoalResolver } from './resolvers/goal-resolver';
import { TaskItemStatusListResolver } from './resolvers/task-item-status-List-resolver';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'angular-highcharts';
import { DashBoardComponent } from './dash-board/dash-board.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskItemListComponent,
    TaskItemComponent,
    TaskItemModalComponent,
    ConfirmModalComponent,
    AuthButtonComponent,
    GoalListComponent,
    GoalModalComponent,
    BreakPointTesterComponent,
    GoalComponent,
    DashBoardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    SecurityModule,
    FontAwesomeModule,
    ChartModule
  ],
  providers: [
    GoalResolver,
    GoalListResolver,
    TaskItemListResolver,
    TaskItemStatusListResolver
  ],
  bootstrap: [AppComponent],
  entryComponents: [TaskItemModalComponent, ConfirmModalComponent, GoalModalComponent]
})
export class AppModule { }
