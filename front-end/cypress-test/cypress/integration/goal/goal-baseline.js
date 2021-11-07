describe('goal-baseline', () => {    

    describe('visit task-list with no goal id in route', () => {
        before(() => {       
            cy.interceptGoalList();        
            cy.interceptTaskItemList();        
            cy.visit('/task-list');    
        });        

        it('the url should contain /task-list/1', () => {
            cy.url().should('contain', '/task-list/1');
        });        

        it('goal selected should be Goal 1', () => {
            cy.get('#goal').find('option:selected').should('have.text', 'Goal 1');
        });        
    });

    describe('visit task-list with goald = 2 in route', () => {
        before(() => {       
            cy.interceptGoalList();        
            cy.interceptTaskItemList();        
            cy.visit('/task-list/2');    
        });        

        it('the url should contain /task-list/2', () => {
            cy.url().should('contain', '/task-list/2');
        });        

        it('goal selected should be Goal 2', () => {
            cy.get('#goal').find('option:selected').should('have.text', 'Goal 2');
        });        
    });


    describe('change goal select to goal 1', () => {
        before(() => {       
            cy.interceptTaskItemList();        
            cy.get('#goal').select('Goal 1');
        });        

        it('the url should contain /task-list/1', () => {
            cy.url().should('contain', '/task-list/1');
        });        

        it('goal selected should be Goal 1', () => {
            cy.get('#goal').find('option:selected').should('have.text', 'Goal 1');
        });        
    });    
});