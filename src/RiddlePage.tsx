import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useRiddlesPage } from './use-riddles-page';



export const RiddlePage = () => {
    const { randomRiddleId, correct, selected, riddle, handleClick } = useRiddlesPage();

    const sorted = useMemo(
        () => riddle?.answers?.toSorted(() => Math.random() - 0.5),
        [riddle?.answers],
    );

    if (!riddle || !sorted) {
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
