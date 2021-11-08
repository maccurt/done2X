describe('task can move thru lanes', () => {

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

    describe('Click move to in progress', () => {

        before(() => {
            cy.fixture('taskItem').then((taskItem) => {
                taskItem.taskItemStatusId = 2
                cy.intercept(
                    {
                        method: 'PUT',
                        url: 'http://localhost/Done2X.API/api/taskItem',
                    },
                    taskItem
                );
                cy.get('#backlog-lane').find('#task-item-101').find('.move-to-progress').click();
            })
        });

        it('should NOT exist in backlog ', () => {
            cy.get('#backlog-lane').find('#task-item-101').should('not.exist');
        });

        it('should exist in progress', () => {
            cy.get('#in-progress-lane').find('#task-item-101').should('exist');
        });

        it('should NOT exist in completed', () => {
            cy.get('#completed-lane').find('#task-item-101').should('not.exist');
        });
    });

    describe('click move to completed', () => {

        before(() => {
            cy.fixture('taskItem').then((taskItem) => {
                taskItem.taskItemStatusId = 3
                cy.intercept(
                    {
                        method: 'PUT',
                        url: 'http://localhost/Done2X.API/api/taskItem',
                    },
                    taskItem
                );
                cy.get('#in-progress-lane').find('#task-item-101').find('.move-to-completed').click();
            })
        });

        it('should NOT exist in backlog ', () => {
            cy.get('#backlog-lane').find('#task-item-101').should('not.exist');
        });

        it('should NOT exist in progress', () => {
            cy.get('#in-progress-lane').find('#task-item-101').should('not.exist');
        });

        it('should exist in completed ', () => {
            cy.get('#completed-lane').find('#task-item-101').should('exist');
        });
    });

});