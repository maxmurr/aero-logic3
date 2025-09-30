import { useState } from 'react';
import { useRiddles } from './domain/riddle/use-riddles';
import { useParams } from 'react-router-dom';
import { getAnswerFor } from 'riddle-exam';
import { createRiddlePageModel } from './services/riddle-page.service';
import { useRiddleById } from './domain/riddle/use-riddle-by-id';

export const useRiddlesPage = () => {
    const { id } = useParams<{ id: string }>();

    const [correct, setCorrect] = useState<{ id: string }>();
    const [selected, setSelected] = useState<string>();

    const { data = [] } = useRiddles();
    const { data: riddle } = useRiddleById(id!);
    const model = createRiddlePageModel(data, riddle);

    const handleClick = async (id: string) => {
        if (selected) {
            return;
        }

        setSelected(id);

        const data = await getAnswerFor(riddle!.id);

        setCorrect(data);
    };

    return {
        ...model,
        handleClick,
        correct,
        selected,
        riddle
    };
};
