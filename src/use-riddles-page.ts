import { useMemo, useState } from 'react';
import { useRiddles } from './domain/riddle/use-riddles';
import { useParams } from 'react-router-dom';
import { getAnswerFor } from 'riddle-exam';
import { createRiddlePageModel } from './services/riddle-page.service';
import { useRiddleById } from './domain/riddle/use-riddle-by-id';
import { Riddle } from './domain/riddle/riddle.service';

export const useRiddlesPage = () => {
    const { id } = useParams<{ id: string }>();

    const [correct, setCorrect] = useState<Riddle['answers'][number]>();
    const [selected, setSelected] = useState<Riddle['answers'][number]['id']>();

    const { data = [] } = useRiddles();
    const { data: riddle } = useRiddleById(id!);
    const model = createRiddlePageModel(data, riddle, correct, selected);

    const handleClick = async (id: Riddle['answers'][number]['id']) => {
        if (selected) {
            return;
        }

        setSelected(id);

        const data = await getAnswerFor(riddle!.id);

        setCorrect(data);
    };

    const sorted = useMemo(
        () => model.sortedAnswers,
        [riddle],
    );

    return {
        ...model,
        handleClick,
        correct,
        riddle,
        sorted
    };
};
