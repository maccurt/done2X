import chaiColors from 'chai-colors';
chai.use(chaiColors);

Cypress.Commands.add('checkInputWithError', (inputId) => {
  cy.get(inputId).parent().should('have.class', 'has-error');
  cy.get(inputId).parent().find('.validation-hint').should('have.css', 'color').and('be.colored', '#ff0000');
  cy.get(inputId).should('have.css', 'background-color').and('be.colored', '#ffe6e6');
  cy.wait(100);
  cy.get(inputId).should('have.css', 'border', '1px solid rgb(255, 0, 0)');
});

Cypress.Commands.add('interceptGoalList', () => {
  cy.fixture('goalList').then((goalList) => {
    cy.intercept({ method: 'GET', url: 'http://localhost/Done2X.API/api/goal', }, goalList)
      .as('interceptGoalList');
  });
});

Cypress.Commands.add('interceptDefaultProject', (taskItem) => {
  cy.intercept({
    method: 'GET',
    url: 'http://localhost/Done2X.API/api/projectg',
  }, { projectId: 1 }).as('interceptDefaultProject');
});

Cypress.Commands.add('interceptTaskItemList', () => {
  cy.intercept({ method: 'GET', url: 'http://localhost/Done2X.API/api/taskItem/goal/*', },
    []).as('interceptTaskItemList');
});

Cypress.Commands.add('interceptTaskItemAdd', (taskItem) => {
  cy.intercept({
    method: 'POST', url: 'http://localhost/Done2X.API/api/taskItem',
  }, taskItem).as('interceptTaskItemAdd');
});

Cypress.Commands.add('interceptTaskItemUpdate', (taskItem) => {
  cy.intercept({ method: 'PUT', url: 'http://localhost/Done2X.API/api/taskItem', },
    taskItem).as('interceptTaskItemUpdate');
});

Cypress.Commands.add('interceptTaskItemDelete', () => {
  cy.intercept('DELETE', '*/api/taskItem/*', { statusCode: 200 }).as('interceptTaskItemDelete');
});