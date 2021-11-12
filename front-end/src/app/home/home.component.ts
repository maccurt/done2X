import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {

  isAuthenticated$!: Subscription;
  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    // this.isAuthenticated$ = this.authService.isAuthenticated$.subscribe(() => {
    //   console.log('authenticated in home');
    // })

  }

  public ngOnDestroy(): void {
    this.isAuthenticated$?.unsubscribe();
  }
}
