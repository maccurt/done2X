import { NgModule } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';
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
                allowedList: [],
                //allowedList: [`${environment.API_URL}*`],
            }
        }),
    ],
    providers: [
        AppAuthGuard
    ]
})
export class SecurityModule {

    constructor() {   }
}
