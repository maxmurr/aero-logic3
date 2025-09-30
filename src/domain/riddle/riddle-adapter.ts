import { Riddle } from "./riddle.service";

export function fetchRiddleCollection(): Promise<Riddle[]> {
    return fetch('http://localhost:3000/riddles')
    .then((response) => response.json())
}
