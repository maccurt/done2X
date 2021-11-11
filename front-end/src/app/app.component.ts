import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

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
  testing: boolean = false;
  constructor(authService: AuthService) {
    this.testing = environment.testing
    authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}