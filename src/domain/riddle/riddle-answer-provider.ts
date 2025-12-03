import { createGenericContext } from '../../common/context';
import type { Riddle } from './riddle.service';

export type RiddleAnswerProvider = (id: string) => Promise<Riddle['answers'][number]>;

export const { useContext, createContextProvider: provideRiddleAnswer } = createGenericContext<RiddleAnswerProvider>();

export function useRiddleCorrectAnswer() {
    return useContext().value;
}
