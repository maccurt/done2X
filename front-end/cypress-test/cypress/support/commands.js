const auth0 = require('auth0-js');
import "cypress-localstorage-commands"

Cypress.Commands.add('interceptGoalList', () => {
  cy.fixture('goalList').then((goalList) => {
    cy.intercept({ method: 'GET', url: 'http://localhost/Done2X.API/api/goal', }, goalList)
      .as('interceptGoalList');
  });
})

Cypress.Commands.add('interceptTaskItemList', () => {
  cy.intercept({ method: 'GET', url: 'http://localhost/Done2X.API/api/taskItem/goal/*', }, [])
    .as('interceptTaskItemList');
})

Cypress.Commands.add('interceptTaskItemAdd', (taskItem) => {
  cy.intercept(
    {
      method: 'POST',
      url: 'http://localhost/Done2X.API/api/taskItem',
    }, taskItem).as('interceptTaskItemAdd');
})

Cypress.Commands.add('interceptTaskItemUpdate', (taskItem) => {
  cy.intercept(
    {
      method: 'PUT',
      url: 'http://localhost/Done2X.API/api/taskItem',
    }, taskItem).as('interceptTaskItemUpdate');
})

Cypress.Commands.add('interceptTaskItemDelete', () => {
  cy.intercept('DELETE', '*/api/taskItem/*', { statusCode: 200 }).as('interceptTaskItemDelete')
})