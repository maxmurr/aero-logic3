import { fetchRiddleCollection } from './riddle-adapter';
import { useQuery } from '@tanstack/react-query';

export const useRiddles = () => {
    const { data = [] } = useQuery({
        queryKey: ['riddles'],
        queryFn: fetchRiddleCollection,
    })

    return { data };
}
