let inProgress = 1;
let completed_status = 3;

describe('change-task-item-status', () => {

    before(() => {
        cy.fixture('taskItemList').then((taskItemList) => {
            cy.interceptTaskItemList(taskItemList)
        });

        cy.fixture('goal').then((goal => {
            cy.interceptGoalGet(goal);
            cy.visit('/goal/101');
            cy.wait('@interceptGoalGet');
            cy.wait('@interceptTaskItemList')
        }));
    });

    beforeEach(() => {
        cy.get('#task-item-list-not-completed').find('table').as('not-completed');
        cy.get('#task-item-list-completed').find('table').as('completed');
    });

    describe('baseline', () => {

        it('url should contain goal/101', () => {
            cy.url().should('contain', 'goal/101');
        });

        describe('not completed list', () => {
            it('should have task 1', () => {
                cy.get('@not-completed').find('#task-item-1').should('exist');
            });

            it('should have task 2', () => {
                cy.get('@not-completed').find('#task-item-2').should('exist');
            });

            it('should NOT have task 3', () => {
                cy.get('@not-completed').find('#task-item-3').should('not.exist');
            });
        });

        describe('completed list', () => {
            it('should NOT have task 1', () => {
                cy.get('@completed').find('#task-item-1').should('not.exist');
            });

            it('should NOT have task 2', () => {
                cy.get('@completed').find('#task-item-2').should('not.exist');
            });

            it('should have task 3', () => {
                cy.get('@completed').find('#task-item-3').should('exist');
            });
        });
    });

    describe('move task 1 to completed', () => {

        before(() => {
            cy.fixture('taskItemList').then((taskItemList) => {
                let task = taskItemList[0];
                task.taskItemStatusId = 3;
                cy.interceptTaskItemUpdate(task);
                cy.get('#task-item-list-not-completed').find('#task-item-1').find('.move-task').click();
                cy.wait('@interceptTaskItemUpdate');
            });
        });

        it('not-completed should NOT have task 1', () => {
            cy.get('@not-completed').find('#task-item-1').should('not.exist');
        });

        it('completed should have task 1', () => {
            cy.get('@completed').find('#task-item-1').should('exist');
        });
    });

    describe('move task 1 back to not completed', () => {

        before(() => {
            cy.fixture('taskItemList').then((taskItemList) => {
                let task = taskItemList[0];
                cy.interceptTaskItemUpdate(task);
                cy.get('#task-item-list-completed').find('#task-item-1').find('.move-task').click();
                cy.wait('@interceptTaskItemUpdate');
            });
        });

        it('not-completed should have task 1', () => {
            cy.get('@not-completed').find('#task-item-1').should('exist');
        });

        it('completed should NOT have task 1', () => {
            cy.get('@completed').find('#task-item-1').should('not.exist');
        });
    });

    describe('add a new task #4 that is NOT completed', () => {

        before(() => {
            cy.fixture('taskItem').then((taskItem) => {
                taskItem.id = 4;
                taskItem.name = 'Task 4';
                cy.interceptTaskItemAdd(taskItem);
                cy.get('#task-item-list-not-completed').find('.add-task-item').click();
                cy.populateTaskItemModal(taskItem);
                cy.get('#task-item-modal').find('#save').click();
                cy.wait('@interceptTaskItemAdd');
            })
        });
        it('not-completed should have task 4', () => {
            cy.get('@not-completed').find('#task-item-4').should('exist');
        });
    });

    describe('add a new task #5 that is completed', () => {
        before(() => {
            cy.fixture('taskItem').then((taskItem) => {
                taskItem.id = 5;
                taskItem.name = 'Task 5';
                taskItem.taskItemStatusId = 3;
                cy.interceptTaskItemAdd(taskItem);
                cy.get('#task-item-list-not-completed').find('.add-task-item').click();
                cy.populateTaskItemModal(taskItem);
                cy.get('#task-item-modal').find('#task-item-status').select('Completed');
                cy.get('#task-item-modal').find('#save').click();
                cy.wait('@interceptTaskItemAdd');
            })
        });
        it('completed should have task 5', () => {
            cy.get('@completed').find('#task-item-5').should('exist');
        });
    });

    describe('update completed task #5 to in progress', () => {
        before(() => {
            cy.fixture('taskItem').then((taskItem) => {
                taskItem.id = 5;
                taskItem.name = 'Task 5';
                taskItem.taskItemStatusId = 1;
                cy.interceptTaskItemUpdate(taskItem);
                cy.get('#task-item-list-completed').find('#task-item-5').find('.edit-task-item').click();
                cy.get('#task-item-modal').find('#task-item-status').select('In Progress');
                cy.get('#task-item-modal').find('#save').click();
                cy.wait('@interceptTaskItemUpdate');
            })
        });
        it('not completed should have task 5', () => {
            cy.get('@not-completed').find('#task-item-5').should('exist');
        });

        it('completed should NOT have task 5', () => {
            cy.get('@completed').find('#task-item-5').should('not.exist');
        });
    });

    describe('update NOT completed task #5 to completed', () => {
        before(() => {
            cy.fixture('taskItem').then((taskItem) => {
                taskItem.id = 5;
                taskItem.name = 'Task 5';
                taskItem.taskItemStatusId = completed_status;
                cy.interceptTaskItemUpdate(taskItem);
                cy.get('#task-item-list-not-completed').find('#task-item-5').find('.edit-task-item').click();
                cy.wait(2000);
                cy.get('#task-item-modal').find('#task-item-status').select('Completed');
                cy.get('#task-item-modal').find('#save').click();                
                cy.wait('@interceptTaskItemUpdate');
            })
        });
        it('not completed should NOT have task 5', () => {
            cy.get('@not-completed').find('#task-item-5').should('not.exist');
        });

        it('completed should have task 5', () => {
            cy.get('@completed').find('#task-item-5').should('exist');
        });
    });
});