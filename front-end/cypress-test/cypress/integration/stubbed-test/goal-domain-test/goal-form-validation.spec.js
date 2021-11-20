describe('goal-form-validation.spec.js', () => {

    before(() => {
        cy.interceptGoalList();
        cy.visit('/goal-list');
        cy.wait('@interceptGoalList');
        cy.get('#add-goal').click();
    });

    describe('focus on each required input and blur/tab off', () => {

        before(() => {
            cy.interceptGoalList();
            cy.visit('/goal-list');
            cy.wait('@interceptGoalList');
            cy.get('#add-goal').click();
        });

        describe('focus on What Is The Goal and then blur off to cause error', () => {
            before(() => {
                cy.get('#name').type(' ').clear().blur();
            });

            it('check input with error', () => {
                cy.checkInputWithError('#name');
            });
        });

        describe('focus on Description and then blur off to cause error', () => {
            before(() => {
                cy.get('#description').type(' ').clear().blur();
            });

            it('check input with error', () => {
                cy.checkInputWithError('#description');
            });
        });

        describe('focus on What Makes It Done and then blur off to cause error', () => {
            before(() => {
                cy.get('#what-is-done').type(' ').clear().blur();
            });

            it('check input with error', () => {
                cy.checkInputWithError('#what-is-done');
            });
        });

        describe('target completion date clear out', () => {

            before(() => {
                cy.get('#target-completion-date').clear().blur();
            });

            it('it should show error', () => {
                //TODO revisit this and make function if need be in
                //future this might have the required hint
                cy.get('#target-completion-date').parent().should('have.class', 'has-error');                
                cy.get('#target-completion-date').should('have.css', 'background-color').and('be.colored', '#ffe6e6');                
                cy.get('#target-completion-date').should('have.css', 'border', '1px solid rgb(255, 0, 0)');
            });

        });

        describe('target completion date put in invalid date 01/17/20', () => {

            before(() => {
                cy.get('#target-completion-date').clear().type('01/17/20').blur();
            });

            it('it should show error', () => {
                //TODO revisit this and make function if need be in
                //future this might have the required hint                
                cy.get('#target-completion-date').parent().should('have.class', 'has-error');                
                cy.get('#target-completion-date').should('have.css', 'background-color').and('be.colored', '#ffe6e6');                
                cy.get('#target-completion-date').should('have.css', 'border', '1px solid rgb(255, 0, 0)');
            });
        });
    });

    describe('click on save without any field being filled out', () => {

        before(() => {
            cy.interceptGoalList();
            cy.visit('/goal-list');
            cy.wait('@interceptGoalList');
            cy.get('#add-goal').click();
            //Click the modal to force the first input not to have focus  
            cy.get('#goal-modal').click().wait(150);
            cy.get('#save').click();
        });

        it('What Is The Goal?', () => {
            cy.checkInputWithError('#name');
        });

        it('Description', () => {
            cy.checkInputWithError('#description');
        });

        it('What Makes It Done?', () => {
            cy.checkInputWithError("#what-is-done");
        });
    });
});