import { App } from '../App';

describe('Access riddle', () => {
    it('see random riddle', () => {
        cy.intercept('GET', '**/riddles', {
            body: [
                { id: 'RIDDLE_ID', contents: 'My riddle contents', answers: [] }
            ],
        });
        cy.intercept('GET', '**/riddles/RIDDLE_ID', {
            body: { id: 'RIDDLE_ID', contents: 'My riddle contents', answers: [] },
        });

        cy.mount(<App />, '/');

        cy.getByTestId('work-interval').should('be.visible');
        cy.getByTestId('timestamp').should('be.visible');
        cy.getByTestId('riddle-control').click();

        cy.url().should('include', 'riddle/RIDDLE_ID');
        cy.contains('My riddle contents').should('be.visible');
    });
})
