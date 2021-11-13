describe('task-form-validation.spec.js', () => {    

    describe('add a new task', () => {

        before(() => {
            cy.interceptGoalList();
            cy.interceptTaskItemList();
            cy.visit('/task-list/1');
            cy.wait('@interceptTaskItemList');
            cy.wait('@interceptGoalList');
            cy.get('#add-task-to-backlog').click();
        });

        it('Task Name', () => {
            cy.get('#name').type(' ').clear().blur();
            cy.checkInputWithError('#name');
        });
    });

    describe('click on save without touching any inputs', () => {
        before(() => {
            cy.interceptGoalList();
            cy.interceptTaskItemList();
            cy.visit('/task-list/1');
            cy.wait('@interceptTaskItemList');
            cy.wait('@interceptGoalList');
            cy.get('#add-task-to-backlog').click();
            //Click the modal to force the first input not to have focus  
            cy.get('#task-item-modal').click().wait(150);
            cy.get('#save').click();
        });

        it('Task Name', () => {   
            cy.checkInputWithError('#name');
        });
    });
});