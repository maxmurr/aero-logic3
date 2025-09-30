import { getRandomRiddle, Riddle } from "../domain/riddle/riddle.service";

export function createRiddlePageModel(riddles: Riddle[], currentRiddle?: Riddle) {
    if (!currentRiddle) {
        return {};
    }

    return {
        randomRiddleId: getRandomRiddle(riddles, currentRiddle.id),
    }

}
