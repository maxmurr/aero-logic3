import { getRandomRiddle, Riddle } from "../domain/riddle/riddle.service";

export function createRiddlePageModel(
    riddles: Riddle[],
    currentRiddle: Riddle | undefined,
    shuffledAnswers: Riddle['answers'],
    correct?: Riddle['answers'][number],
    selected?: Riddle['answers'][number]['id']
) {
    let sortedAnswers = shuffledAnswers.map((answer) => {
        let answerState = 'initial';

        if (selected === answer.id &&
            correct &&
            correct.id === answer.id) {
            answerState = 'correct';
        }

        if (selected === answer.id &&
            correct &&
            correct.id !== answer.id) {
            answerState = 'incorrect';
        }

        return {
            ...answer,
            state: answerState,
            isSelected: selected,
            isCorrectAvailable: correct,
        }
    });

    let state = 'playing';
    if (selected && correct && selected === correct.id ){
        state = 'correct';
    }

    if (selected && correct && selected !== correct.id ){
        state = 'incorrect';
    }

    if (!currentRiddle) {
        return {};
    }

    return {
        randomRiddleId: getRandomRiddle(riddles, currentRiddle.id),
        sortedAnswers,
        state,
    }
}
