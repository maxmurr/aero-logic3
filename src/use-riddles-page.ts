import { useRiddles } from './domain/riddle/use-riddles';

export const useRiddlesPage = () => {
    const { data } = useRiddles();
    const model = {}; //

    return model;
}
