describe('goal-form-validation.spec.js', () => {

    before(() => {
        cy.interceptGoalList();
        cy.visit('/goal-list');
        cy.wait('@interceptGoalList');
        cy.get('#add-goal').click();
    });

    // describe('baseline', () => {
    //     it('what is the goal error should not be visible', () => {
    //         cy.get('#name').parent().find('.validation-hint').should('exist').should('not.be.visible');
    //     });

    //     it('description should not be visible', () => {
    //         cy.get('#description').parent().find('.input-error').should('exist').should('not.be.visible');
    //     });

    //     it('what is done error should not be visible', () => {
    //         cy.get('#what-is-done').parent().find('.input-error').should('exist').should('not.be.visible');
    //     });
    // });

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