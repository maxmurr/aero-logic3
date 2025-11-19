import { useEffect, useMemo, useState } from 'react';
import { useRiddles } from './domain/riddle/use-riddles';
import { useParams } from 'react-router-dom';
import { createRiddlePageModel } from './services/riddle-page.service';
import { useRiddleById } from './domain/riddle/use-riddle-by-id';
import { useRiddleAnswer } from './domain/riddle/use-riddle-answer';
import { Riddle, sortAnswers } from './domain/riddle/riddle.service';

export const useRiddlesPage = () => {
    const { id } = useParams<{ id: string }>();

    const [correct, setCorrect] = useState<Riddle['answers'][number]>();
    const [selected, setSelected] = useState<Riddle['answers'][number]['id']>();

    const { data = [] } = useRiddles();
    const { data: riddle } = useRiddleById(id!);
    const { data: answerData } = useRiddleAnswer(riddle?.id);

    const shuffledAnswers = useMemo(
        () => riddle ? sortAnswers(riddle.answers) : [],
        [riddle]
    );

    const model = createRiddlePageModel(data, riddle, shuffledAnswers, correct, selected);

    useEffect(() => {
        if (selected && answerData && !correct) {
            setCorrect(answerData);
        }
    }, [selected, answerData, correct]);

    const handleClick = (id: Riddle['answers'][number]['id']) => {
        if (selected) {
            return;
        }

        setSelected(id);
    };

    return {
        ...model,
        handleClick,
        correct,
        riddle,
        sorted: model.sortedAnswers
    };
};
