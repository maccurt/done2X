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

        it('goal-count-percentage should be correct', () => {
            cy.get('#goal-count-percentage').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('33.33% of goals have been completed');
            })            
        }); 

        it('task-count-text should be correct', () => {
            cy.get('#task-count-text').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('6 Of 17 Tasks Are Completed');
            })            
        }); 

        it('task-count-percentage should be correct', () => {
            cy.get('#task-count-percentage').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('35.29% of task have been completed');
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
        
        it('goal-count-percentage should be correct', () => {
            cy.get('#goal-count-percentage').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('25% of goals have been completed');
            })            
        }); 
    });

    describe('Add a task that is not completed', () => {

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

        it('task-count-percentage should be correct', () => {
            cy.get('#task-count-percentage').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('33.33% of task have been completed');
            })            
        });         
    });

    describe('Add a task that is completed', () => {

        before(() => {
            cy.get('#goal-1').find('.add-task-item').click();
            cy.addTask(3);
        });
        
        it('task-count-text should be correct', () => {
            cy.get('#task-count-text').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('7 Of 19 Tasks Are Completed');
            })            
        }); 

        it('task-count-percentage should be correct', () => {
            cy.get('#task-count-percentage').invoke('text').then((text)=>{
                expect(text.trim()).to.eq('36.84% of task have been completed');
            })            
        });         
    });

});