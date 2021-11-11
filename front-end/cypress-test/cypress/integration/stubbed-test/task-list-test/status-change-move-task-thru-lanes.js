describe('status change moves task thru lanes', () => {
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
            cy.get('#backlog-lane').find('#task-item-101').should('exist');
            cy.wait('@interceptTaskItemAdd');
        })
    });

    describe('Click move to in progress', () => {
        before(() => {
            cy.fixture('taskItem').then((taskItem) => {
                taskItem.taskItemStatusId = 2
                cy.interceptTaskItemUpdate(taskItem);
                cy.get('#backlog-lane').find('#task-item-101').find('.task-item-name').click();
                cy.get('#task-item-modal').find('#task-item-status').select('In Progress');
                cy.get('#task-item-modal').find('#save').click();
                cy.wait('@interceptTaskItemUpdate');
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
                cy.interceptTaskItemUpdate(taskItem);
                cy.get('#in-progress-lane').find('#task-item-101').find('.move-to-completed').click();
                cy.wait('@interceptTaskItemUpdate');
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