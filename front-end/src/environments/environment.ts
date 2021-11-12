// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  testing: false,
  API_URL: 'http://localhost/Done2X.API/api/',
  allowedList: ['http://localhost/Done2X.API/api/*'],
  auth: {
    domain: 'profitdreamer.auth0.com',
    clientId: '1GBzlqLA7ch77mINpaqruTnSrXaKbjp2',
    audience: 'https://api.done2x.com/api',
    serverUrl: 'http://localhost/Done2X.API/api/',
    redirectUri: window.location.origin,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
