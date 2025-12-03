import { describe, it, expect } from 'vitest';
import { createLandingPageModel } from '../landing-page.service';

describe('Landing Page Model', () => {
    it('returns model with formatted timestamp', () => {
        const date = new Date('2025-01-01T00:00:00+07:00');

        const result = createLandingPageModel([], date);

        expect(result.timestamp).toBe('2025-01-01 00:00');
    });

    it('returns model with Easy jets work interval', () => {
        const date = new Date('2025-01-01T13:00:00+07:00');

        const result = createLandingPageModel([], date);

        expect(result.workInterval).toBe('Easy jets');
    });

    it('returns model with Returning pips work interval', () => {
        const date = new Date('2025-01-01T18:00:00+07:00');

        const result = createLandingPageModel([], date);

        expect(result.workInterval).toBe('Returning pips');
    });

    it('returns model with Sleepies work interval', () => {
        const date = new Date('2025-01-01T23:01:00+07:00');

        const result = createLandingPageModel([], date);

        expect(result.workInterval).toBe('Sleepies');
    });

    it('returns model with random riddle', () => {
        const date = new Date('2025-01-01T00:00:00+07:00');

        const result = createLandingPageModel([{ id: '1', contents: 'Riddle 1', answers: [] }], date);

        expect(result.riddleId).toBe('1')
    });
})
