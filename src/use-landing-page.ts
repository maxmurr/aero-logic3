import { useEffect, useState } from 'react';
import { Riddle } from './domain/riddle/riddle.service';
import { createLandingPageModel } from './services/landing-page.service';
import { fetchRiddleCollection } from './domain/riddle/riddle-adapter';

export function useLandingPage() {
    const [riddles, setRiddles] = useState<Riddle[]>([]);
    const model = createLandingPageModel(riddles);

    useEffect(() => {
        fetchRiddleCollection().then(setRiddles);
    }, []);

    return model
}
