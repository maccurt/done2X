describe('goal-add.spec.js', () => {

    describe('add a new goal', () => {

        before(() => {
            cy.interceptGoalList();
            cy.visit('/goal-list');
            cy.wait('@interceptGoalList');
            cy.get('#add-goal').click();
            cy.fixture('goal').then((goal) => {
                cy.get('#name').type(goal.name);
                cy.get('#description').type(goal.description);
                cy.get('#what-is-done').type(goal.whatIsDone);
            })
        });

        it('goal should exist in not completed laned', () => {
            cy.fixture('goal').then((goal) => {
                goal.id = 101;
                cy.interceptGoalAdd(goal);
                cy.get('#save').click();
                cy.wait('@interceptGoalAdd');
                cy.get('#goal-list-not-completed').find('#goal-101').should('exist');
            });
        });
    });
})