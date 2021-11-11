export const environment = {
  production: true,
  testing: false,
  API_URL: 'https://api.done2x.com/api/',
  allowedList: ['*api.done2x.com/api/*'],
  auth: {
    domain: 'profitdreamer.auth0.com',
    clientId: '1GBzlqLA7ch77mINpaqruTnSrXaKbjp2',
    audience: 'https://api.done2x.com/api',
    serverUrl: 'http://localhost/Done2X.API/api/', //? Why us this localhost
    redirectUri: window.location.origin,
  }
};
