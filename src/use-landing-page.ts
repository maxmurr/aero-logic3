import { createLandingPageModel } from './services/landing-page.service';
import { useRiddles } from './domain/riddle/use-riddles';

export function useLandingPage() {
    const { data: riddles } = useRiddles();
    const model = createLandingPageModel(riddles);

    return model
}
