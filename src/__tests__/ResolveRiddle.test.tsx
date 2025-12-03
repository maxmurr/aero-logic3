import { App } from '../App';
import { ContextProvider } from '../common/context';
import { provideRiddleAnswer } from '../domain/riddle/riddle-answer-provider';

describe('Resolve riddle', () => {
    it('resolve riddle successfully', () => {
        cy.intercept('GET', '**/riddles/RIDDLE_ID', {
            body: {
                id: 'RIDDLE_ID',
                contents: 'My riddle contents',
                answers: [
                    { id: '1', text: 'Answer 1' },
                    { id: '2', text: 'Answer 2' },
                    { id: '3', text: 'Answer 3' },
                ],
            },
        });

        const fake = () => Promise.resolve({ id: '1', text: 'Answer 1' });

        cy.mount(
            <ContextProvider providers={[provideRiddleAnswer(fake)]}>
                <App />
            </ContextProvider>,
            '/riddle/RIDDLE_ID',
        );

        cy.contains('My riddle contents').should('be.visible');
        cy.contains('Answer 1').should('be.visible');
        cy.contains('Answer 2').should('be.visible');
        cy.contains('Answer 3').should('be.visible');

        cy.contains('Answer 1').click();

        cy.contains("Great job! You're right 🙏").should('be.visible');
    });

    it('resolve riddle unsuccessfully', () => {
        cy.intercept('GET', '**/riddles/RIDDLE_ID', {
            body: {
                id: 'RIDDLE_ID',
                contents: 'My riddle contents',
                answers: [
                    { id: '1', text: 'Answer 1' },
                    { id: '2', text: 'Answer 2' },
                    { id: '3', text: 'Answer 3' },
                ],
            },
        });

        const fake = () => Promise.resolve({ id: '1', text: 'Answer 1' });

        cy.mount(
            <ContextProvider providers={[provideRiddleAnswer(fake)]}>
                <App />
            </ContextProvider>,
            '/riddle/RIDDLE_ID',
        );

        cy.contains('My riddle contents').should('be.visible');
        cy.contains('Answer 1').should('be.visible');
        cy.contains('Answer 2').should('be.visible');
        cy.contains('Answer 3').should('be.visible');

        cy.contains('Answer 2').click();

        cy.contains("This time your answer is wrong.").should('be.visible');
    });


});
