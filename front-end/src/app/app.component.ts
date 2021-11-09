import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Goal, GoalService } from './goal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'done2X';
  formGroup!: FormGroup;
  goalControl: FormControl = new FormControl();
  isAuthenticated: boolean = false;
  constructor(authService: AuthService) {
    authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    })
  }
}
