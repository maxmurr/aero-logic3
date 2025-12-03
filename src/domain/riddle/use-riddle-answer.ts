import { useQuery } from '@tanstack/react-query';
import { useRiddleCorrectAnswer } from './riddle-answer-provider';

export const useRiddleAnswer = (riddleId?: string) => {
    const fetchAnswerForRiddle = useRiddleCorrectAnswer();
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
