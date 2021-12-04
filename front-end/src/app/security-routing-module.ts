
import { NgModule } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { AppAuthGuard } from './guards/app-auth.guard';

@NgModule({
    declarations: [
    ],
    imports: [
        AuthModule.forRoot({
            domain: environment.auth.domain,
            clientId: environment.auth.clientId,
            audience: environment.auth.audience,
            redirectUri: environment.auth.redirectUri,
            httpInterceptor: {
                allowedList: [`${environment.API_URL}*`],
            }
        }),
    ],
    providers: [
        AppAuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
    ]

})
export class SecurityModule {
    constructor(){        
    }
 }
