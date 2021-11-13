//TODO this really is not a good test
//we are testing that http client works
//that is not our code, we should take that goal is passed in a 
//unit test
// describe('goal-modal-validation.js', () => {

//     describe('add a new goal', () => {

//         before(() => {
//             cy.interceptGoalList();
//             cy.visit('/goal-list');
//             cy.wait('@interceptGoalList');
//             cy.get('#add-goal').click();
//             cy.fixture('goal').then((goal) => {
//                 cy.get('#name').type(goal.name);
//                 cy.get('#description').type(goal.description);
//                 cy.get('#what-is-done').type(goal.whatIsDone);
//             })
//         });

//         it('should behave...', () => {

//             cy.fixture('goal').then((goal) => {

//                 cy.intercept(
//                     {
//                         method: 'POST',
//                         url: 'http://localhost/Done2X.API/api/goal',
//                     }, goal)
//                     .as('interceptGoalAdd');

//                 cy.get('#save').click();
//                 cy.wait('@interceptGoalAdd');

//                 cy.get('@interceptGoalAdd').then((x)=>{
//                     console.log(x.request.body);
//                     console.log(goal);
//                     expect(x.request.body.name).equal(goal);

//                 });
//             });
//         });
//     });
// })