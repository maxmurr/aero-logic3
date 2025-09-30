import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getAnswerFor } from 'riddle-exam';
import { useRiddlesPage } from './use-riddles-page';

type Riddle = {
    id: string;
    contents: string;
    answers: {
        id: string;
        text: string;
    }[];
};

export const RiddlePage = () => {
    const { id } = useParams<{ id: string }>();
    const { randomRiddleId } = useRiddlesPage();
    const [riddle, setRiddle] = useState<Riddle>();
    const [isLoading, setIsLoading] = useState(true);
    const [correct, setCorrect] = useState<{ id: string }>();
    const [selected, setSelected] = useState<string>();
    // const [random, setRandom] = useState<string>();

    const handleClick = async (id: string) => {
        if (selected) {
            return;
        }

        setSelected(id);

        const data = await getAnswerFor(riddle!.id);

        setCorrect(data);
    };

    const sorted = useMemo(
        () => riddle?.answers?.toSorted(() => Math.random() - 0.5),
        [riddle?.answers],
    );

    useEffect(() => {
        if (correct) {
            fetch('http://localhost:3000/riddles')
                .then((response) => response.json())
                .then((riddles: Riddle[]) => {
                    const ids = riddles
                        .map(({ id: riddleId }) => riddleId)
                        .filter((riddleId) => riddleId !== id);
                    setRandom(ids[Math.floor(Math.random() * ids.length)]);
                });
        }
    }, [correct]);

    useEffect(() => {
        fetch(`http://localhost:3000/riddles/${id}`)
            .then((response) => response.json())
            .then(setRiddle)
            .finally(() => setIsLoading(false));
    }, []);

    if (!riddle || !sorted || isLoading) {
        return null;
    }

    return (
        <main className="text-lg">
            <p dangerouslySetInnerHTML={{ __html: riddle.contents }} className="mb-16" />
            <p className="mb-5">Possible answers:</p>
            <ul>
                {sorted.map((answer) => (
                    <li
                        key={answer.id}
                        onClick={() => handleClick(answer.id)}
                        className={classNames('border py-2 pl-3 pr-2 my-1', {
                            'cursor-pointer': !selected,
                            'border-blue-500': !correct,
                            "border-green-700 text-green-900 before:content-['✓']":
                                selected === answer.id &&
                                correct &&
                                correct.id === answer.id,
                            "border-red-700 text-red-800  before:content-['✗']":
                                selected === answer.id &&
                                correct &&
                                correct.id !== answer.id,
                        })}
                    >
                        <span className="pl-2">{answer.text}</span>
                    </li>
                ))}
            </ul>
            {selected && correct && selected === correct.id && (
                <div className="bg-green-400 my-6 p-3">
                    {"Great job! You're right 🙏"}
                </div>
            )}
            {selected && correct && selected !== correct.id && (
                <div className="bg-red-300  my-6 p-3">
                    {'This time your answer is wrong.'}
                </div>
            )}
            {correct && randomRiddleId && (
                <div className="mt-5">
                    <Link to={`/riddle/${randomRiddleId}`} reloadDocument className="underline">
                        Play one more
                    </Link>
                </div>
            )}
        </main>
    );
};
