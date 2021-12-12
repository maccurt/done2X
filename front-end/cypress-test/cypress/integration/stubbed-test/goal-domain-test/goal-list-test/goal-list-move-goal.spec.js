describe('move goal', () => {
    let goal_1;
    before(() => {

        cy.fixture('goalList').then((goalList) => {
            goal_1 = goalList[0];
        });
        cy.interceptGoalList();
        cy.visit('/goal-list');
        cy.wait('@interceptGoalList');
    });

    describe('baseline', () => {
        it('url should contain goal-list', () => {
            cy.url().should('contain', 'goal-list');
        });

        it('goa1 1 should be in completed list', () => {
            cy.get('#goal-list-not-completed').find('#goal-1').should('exist');
        });
    });

    describe('move goal 1 to completed', () => {
        before(() => {
            cy.interceptGoalUpdate(goal_1);
            cy.get('#goal-list-not-completed').find('#goal-1').find('.move-goal').click();
            cy.wait('@interceptGoalUpdate');
        });

        it('goa1 1 should NOT be in completed list', () => {
            cy.get('#goal-list-not-completed').find('#goal-1').should('not.exist');
        });

        it('goa1 1 should be in completed list', () => {
            cy.get('#goal-list-completed').find('#goal-1').should('exist');
        });
    });

    describe('move goal 1 back to completed', () => {
        before(() => {
            cy.interceptGoalUpdate(goal_1);
            cy.get('#goal-list-completed').find('#goal-1').find('.move-goal').click();
            cy.wait('@interceptGoalUpdate');
        });

        it('goa1 1 should be in not-completed list', () => {
            cy.get('#goal-list-not-completed').find('#goal-1').should('exist');
        });

        it('goa1 1 should not be in completed list', () => {
            cy.get('#goal-list-completed').find('#goal-1').should('not.exist');
        });
    });

    describe('move goal but throw error', () => {
        before(() => {

            cy.intercept('PUT', 'http://localhost/Done2X.API/api/goal',
                {
                    statusCode: 500,
                    body:
                    {
                        "showMessage": true,
                        "code": 0,
                        "message": "Goal can not be completed it has task that are not completed"
                    }
                })
                .as('interceptGoalUpdate');
            cy.get('#goal-list-not-completed').find('#goal-1').find('.move-goal').click();
            cy.wait('@interceptGoalUpdate');
        });

        it('snack bar error should exist', () => {
            cy.get('.snack-bar-error').should('exist');
        });

        it('snack bar error should NOT exist after 6 seconds', () => {
            cy.get('.snack-bar-error', { timeout: 6000 }).should('not.exist');
        });

    });
});