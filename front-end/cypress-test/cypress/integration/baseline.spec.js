describe('home-basline.spec.js', () => {

    before(() => {
        cy.visit('/task-item-list');
    });

    describe('you are on the home page', () => {

        it('title should be correct', () => {
            cy.title().should('equal', 'Done2X');
        });

        it('the url should contain /home', () => {
            cy.url().should('contain', '/home');
        });
        
    });

    // describe('card buttons should take you to correct page', () => {

    //     beforeEach(() => {
    //         cy.visit('');
    //     });

    //     describe('click mortgate calculator link', () => {
    //         it('should route to mortgage pay off calculator', () => {
    //             cy.get('#logo-container').find('#mortgage-link').click();

    //             cy.url().should('contain', '/mortgage-payoff-calculator');
    //         });
    //     });

    //     describe('click credit card calculator', () => {
    //         it('should route to credit card calculator', () => {
    //             cy.get('#logo-container').find('#credit-card-link').click();
    //             cy.url().should('contain', '/credit-card-calculator');
    //         });
    //     });

    // });

});