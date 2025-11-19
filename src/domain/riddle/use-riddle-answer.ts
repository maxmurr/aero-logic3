import { useQuery } from '@tanstack/react-query';
import { fetchAnswerForRiddle } from './riddle-adapter';

export const useRiddleAnswer = (riddleId?: string) => {
    const query = useQuery({
        queryKey: ['riddle-answer', riddleId],
        queryFn: () => fetchAnswerForRiddle(riddleId!),
        enabled: !!riddleId,
        staleTime: Infinity,
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,
        isSuccess: query.isSuccess,
    };
}
