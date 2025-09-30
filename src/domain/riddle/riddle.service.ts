export type Riddle = {
    id: string;
    contents: string;
    answers: {
        id: string;
        text: string;
    }[];
};

export function getRandomRiddle(riddles: Riddle[]) {
    const ids = riddles.map(({ id: riddleId }) => riddleId);
    return ids[Math.floor(Math.random() * ids.length)];
}
