import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthGuard, AuthService } from "@auth0/auth0-angular";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AppAuthGuard extends AuthGuard {

    constructor(auth: AuthService){        
        super(auth);
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        console.log('canLoad')
        return super.canLoad(route,segments);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('canActivateChild')
        return super.canActivateChild(childRoute,state);
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('canActivate')
        if (environment.testing && !environment.production) {
            console.log('running in testin mode do not release this code');
            return of(true)
        }
        else {
            return super.canActivate(next, state)
        }
    }
}

