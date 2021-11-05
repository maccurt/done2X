
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskItemListComponent,
    TaskItemComponent,
    TaskItemModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,    
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TaskItemModalComponent,ConfirmModalComponent]
})
export class AppModule { }
