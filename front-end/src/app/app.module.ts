import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskItemListComponent } from './task-item-list/task-item-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskItemModalComponent } from './task-item-modal/task-item-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { GoalListResolver } from './resolvers/goal-list.resolver';
import { TaskItemListResolver } from './resolvers/task-item-list.resolver';
import { AppAuthGuard } from './guards/app-auth.guard';
import { SecurityModule } from './security-routing-module';
import { GoalListComponent } from './goal-domain/goal-list/goal-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskItemListComponent,
    TaskItemComponent,
    TaskItemModalComponent,
    ConfirmModalComponent,
    AuthButtonComponent,
    GoalListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    SecurityModule
    // AuthModule.forRoot({
    //   domain: environment.auth.domain,
    //   clientId: environment.auth.clientId,
    //   audience: environment.auth.audience,
    //   redirectUri: environment.auth.redirectUri,
    //   httpInterceptor: {
    //     allowedList: [`${environment.API_URL}*`],
    //   }
    // }),
  ],
  providers: [    
    GoalListResolver,
    TaskItemListResolver,    
  ],
  bootstrap: [AppComponent],
  entryComponents: [TaskItemModalComponent, ConfirmModalComponent]
})
export class AppModule { }
