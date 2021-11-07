describe('task-can-delete.js', () => {
    before(() => {
        cy.interceptGoalList();
        cy.interceptTaskItemList();        
        cy.visit('/task-list');
    });

    it('Add New Task To Backlog', () => {
        cy.fixture('taskItem').then((taskItem) => {
            cy.intercept(
                {
                    method: 'POST',
                    url: 'http://localhost/Done2X.API/api/taskItem',
                },
                taskItem
            );

            cy.get('#add-task-to-backlog').click();
            cy.get('#task-item-modal').find('#name').type(taskItem.name);
            cy.get('#task-item-modal').find('#description').type(taskItem.description);
            cy.get('#task-item-modal').find('#save').click();
            cy.get('#backlog-lane').find('#task-item-101').should('exist');
        })
    });

    describe('delete click', () => {
        beforeEach(() => {
            cy.intercept('DELETE', '*/api/taskItem/*', { statusCode: 200 });
            cy.get('#backlog-lane').find('#task-item-101').find('.delete-task-item').click();
            cy.get('#confirm-modal').find('#yes-answer').click();
        });

        it('should NOT exist in backlog ', () => {
            cy.get('#backlog-lane').find('#task-item-101').should('not.exist');
        });
    });
});