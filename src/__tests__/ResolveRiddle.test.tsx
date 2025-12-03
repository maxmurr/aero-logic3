import { App } from "../App";

describe('Resolve riddle', () => {
    it('resolve riddle successfully', () => {
        cy.intercept('GET', '**/riddles/RIDDLE_ID', {
            body: { id: 'RIDDLE_ID', contents: 'My riddle contents', answers: [
                { id: '1', text: 'Answer 1' },
                { id: '2', text: 'Answer 2' },
                { id: '3', text: 'Answer 3' },
            ] },
        });

        cy.mount(<App />, '/riddle/RIDDLE_ID');

        cy.contains('My riddle contents').should('be.visible');
        cy.contains('Answer 1').should('be.visible');
        cy.contains('Answer 2').should('be.visible');
        cy.contains('Answer 3').should('be.visible');

        cy.contains('Answer 1').click();

        cy.contains('Great job! You\'re right 🙏').should('be.visible');
    })
})
