import { getRandomRiddle, Riddle } from "../domain/riddle/riddle.service";

export function createLandingPageModel(riddles: Riddle[], date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const hoursStr = Number(hours);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    let workInterval = 'Busy Times';

    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}`;

    if (hoursStr >= 11 && hoursStr < 17) {
        workInterval = 'Easy jets';
    } else if (hoursStr >= 17 && hoursStr < 23) {
        workInterval = 'Returning pips';
    } else if ((hoursStr >= 23 && hoursStr < 24) || (hoursStr >= 0 && hoursStr < 5)) {
        workInterval = 'Sleepies';
    }

    return {
        timestamp,
        workInterval,
        riddleId: getRandomRiddle(riddles),
    }
}
