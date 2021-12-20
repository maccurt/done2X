import chaiColors from 'chai-colors';
chai.use(chaiColors);

Cypress.Commands.add('checkInputWithError', (inputId) => {
  cy.get(inputId).parent().should('have.class', 'has-error');
  cy.get(inputId).parent().find('.validation-hint').should('have.css', 'color').and('be.colored', '#ff0000');
  cy.get(inputId).should('have.css', 'background-color').and('be.colored', '#ffe6e6');
  cy.wait(100);
  cy.get(inputId).should('have.css', 'border', '1px solid rgb(255, 0, 0)');
});

Cypress.Commands.add('addGoal', () => {
  cy.get('#add-goal').click();
  cy.fixture('goal').then((goal) => {
    goal.id = 101;
    cy.get('#name').type(goal.name);
    cy.get('#description').type(goal.description);
    cy.get('#what-is-done').type(goal.whatIsDone);
    cy.interceptGoalAdd(goal);
    cy.get('#save').click();
    cy.wait('@interceptGoalAdd');
  })
})


Cypress.Commands.add('addTask',(taskItemStatusId = 1)=>{

  cy.fixture('taskItem').then((taskItem) => {
    taskItem.taskItemStatusId = taskItemStatusId;
    cy.interceptTaskItemAdd(taskItem)    
    cy.get('#task-item-modal').find('#name').type(taskItem.name);
    cy.get('#task-item-modal').find('#description').type(taskItem.description);
    cy.get('#task-item-modal').find('#save').click();
    cy.wait('@interceptTaskItemAdd')    
  });
})


Cypress.Commands.add('interceptGoalList', () => {
  cy.fixture('goalList').then((goalList) => {
    cy.intercept({ method: 'GET', url: 'http://localhost/Done2X.API/api/goal', }, goalList)
      .as('interceptGoalList');
  });
});

Cypress.Commands.add('interceptGoalGet', (goal) => {
  cy.intercept(
    {
      method: 'GET',
      url: 'http://localhost/Done2X.API/api/goal/*',
    }, goal)
    .as('interceptGoalGet');
})

Cypress.Commands.add('interceptGoalAdd', (goal) => {
  cy.intercept(
    {
      method: 'POST',
      url: 'http://localhost/Done2X.API/api/goal',
    }, goal)
    .as('interceptGoalAdd');
})

Cypress.Commands.add('interceptGoalUpdate', (goal) => {
  cy.intercept(
    {
      method: 'PUT',
      url: 'http://localhost/Done2X.API/api/goal',
    }, goal)
    .as('interceptGoalUpdate');
})

Cypress.Commands.add('interceptDefaultProject', () => {
  cy.intercept({
    method: 'GET',
    url: 'http://localhost/Done2X.API/api/projectg',
  }, { projectId: 1 }).as('interceptDefaultProject');
});

Cypress.Commands.add('interceptTaskItemList', (taskItemList = []) => {
  cy.intercept({ method: 'GET', url: 'http://localhost/Done2X.API/api/taskItem/goal/*', },
    taskItemList).as('interceptTaskItemList');
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

Cypress.Commands.add('populateTaskItemModal', (taskItem) => {

  cy.get('#task-item-modal').find('#name').type(taskItem.name);
  cy.get('#task-item-modal').find('#description').type(taskItem.description);
})