describe('goal-move-to-completed.spec.js', () => {

    describe('goal 1 should be in list', () => {
        before(() => {
            cy.interceptGoalList();
            cy.visit('/goal-list');
            cy.wait('@interceptGoalList');
        });

        it('goal 1 should exist in not completed lane', () => {
            cy.get('#goal-list-not-completed').find('#goal-1').should('exist');
        });

        describe('click completed on Goal 1', () => {

            before(() => {
                cy.fixture('goal').then((goal) => {
                    goal.id = 1;
                    cy.interceptGoalUpdate(goal);   
                    cy.get('#goal-list-not-completed').find('#goal-1').find('.complete').click();
                    cy.wait('@interceptGoalUpdate');
                }); 
            });         

            it('goal 1 should NOT exist in not completed lane', () => {
                cy.get('#goal-list-not-completed').find('#goal-1').should('not.exist');
            });
            
            it('goal 1 should exist in completed lane', () => {
                cy.wait(250);
                cy.get('#goal-list-completed').find('#goal-1').should('exist');
            });
        });
    });
});