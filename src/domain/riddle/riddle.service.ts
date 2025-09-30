export type Riddle = {
    id: string;
    contents: string;
    answers: {
        id: string;
        text: string;
    }[];
};

export function getRandomRiddle(riddles: Riddle[], exludeId?: Riddle['id']) {
    let ids = riddles.map(({ id: riddleId }) => riddleId);
    if (exludeId) {
        ids = ids.filter((id) => id !== exludeId);
    }
    return ids[Math.floor(Math.random() * ids.length)];
}

export function sortAnswers(answers: Riddle['answers']) {
    return answers.toSorted(() => Math.random() - 0.5);
}
