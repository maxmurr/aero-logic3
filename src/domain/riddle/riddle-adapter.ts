import { Riddle } from "./riddle.service";
import { getAnswerFor } from 'riddle-exam';

export function fetchRiddleCollection(): Promise<Riddle[]> {
    return fetch('http://localhost:3000/riddles')
    .then((response) => response.json())
}

export function fetchRiddleById(id: string): Promise<Riddle> {
    return fetch(`http://localhost:3000/riddles/${id}`)
    .then((response) => response.json())
}

export function fetchAnswerForRiddle(riddleId: string): Promise<Riddle['answers'][number]> {
    return getAnswerFor(riddleId);
}
