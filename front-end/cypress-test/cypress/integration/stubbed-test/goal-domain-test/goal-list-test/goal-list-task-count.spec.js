describe('goal-list-task-count.spec.js', () => {
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

        it('goal-count-info should exist', () => {
            cy.get('#goal-count-info').should('exist');            
        });

        it('goal-count-text should be correct', () => {
            cy.get('#goal-count-text').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('1 Of 3 Goals Are Completed');
            })            
        }); 

        it('tasl-count-text should be correct', () => {
            cy.get('#task-count-text').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('6 Of 17 Tasks Are Completed');
            })            
        }); 
    });

    describe('Add a goal', () => {
        before(() => {
            cy.addGoal();
        });

        it('goal item task should be 1 / 2', () => {
            cy.get('#goal-1').find('.task-count').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('1 / 2');
            })            
        });

        it('goal-count-text should be correct', () => {
            cy.get('#goal-count-text').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('1 Of 4 Goals Are Completed');
            })            
        });        
    });

    describe('Add a task', () => {

        before(() => {
            cy.get('#goal-1').find('.add-task-item').click();
            cy.addTask();
        });

        it('goal item task should be 1 / 3', () => {
            cy.get('#goal-1').find('.task-count').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('1 / 3');
            })            
        });

        it('task-count-text should be correct', () => {
            cy.get('#task-count-text').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('6 Of 18 Tasks Are Completed');
            })            
        }); 
        
    });
});