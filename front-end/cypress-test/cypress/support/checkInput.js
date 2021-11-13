
export class CheckInputError {

     checkInputError(inputId) {

        it('parent element should have class has-error', () => {
            cy.get(inputId).parent().should('have.class', 'has-error');
        });

        it('error should be visisble', () => {
            cy.get(inputId).parent().find('.input-error').should('be.visible');
        });
    }

}
