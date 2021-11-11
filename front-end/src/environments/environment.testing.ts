export const environment = {
  production: false,
  testing: true,
  API_URL: 'http://localhost/Done2X.API/api/',
  allowedList: [],
  auth: {
    domain: 'profitdreamer.auth0.com',
    clientId: '1GBzlqLA7ch77mINpaqruTnSrXaKbjp2',
    audience: 'https://api.done2x.com/api',
    serverUrl: 'http://localhost/Done2X.API/api/',
    redirectUri: window.location.origin,
  }
};
