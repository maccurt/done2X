describe('task-can-delete.js', () => {
    before(() => {
        cy.interceptGoalList();
        cy.interceptTaskItemList();
        cy.visit('/task-list/1');
        cy.wait('@interceptGoalList');
        cy.wait('@interceptTaskItemList');
    });

    it('Add New Task To Backlog', () => {
        cy.fixture('taskItem').then((taskItem) => {
            cy.interceptTaskItemAdd(taskItem);
            cy.get('#add-task-to-backlog').click();
            cy.get('#task-item-modal').find('#name').type(taskItem.name);
            cy.get('#task-item-modal').find('#description').type(taskItem.description);
            cy.get('#task-item-modal').find('#save').click();
            cy.wait('@interceptTaskItemAdd')
            cy.get('#backlog-lane').find('#task-item-101').should('exist');
        })
    });

    describe('delete click', () => {
        beforeEach(() => {
            cy.interceptTaskItemDelete();            
            cy.get('#backlog-lane').find('#task-item-101').find('.delete-task-item').click();            
            cy.get('#confirm-modal').find('#yes-answer').click();
            cy.wait('@interceptTaskItemDelete')
        });

        it('should NOT exist in backlog ', () => {
            cy.get('#backlog-lane').find('#task-item-101').should('not.exist');
        });
    });
});