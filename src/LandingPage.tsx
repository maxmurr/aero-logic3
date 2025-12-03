import { Link } from 'react-router-dom';
import { useLandingPage } from './use-landing-page';

export const LandingPage = () => {
    const { workInterval, timestamp, riddleId } = useLandingPage();

    return (
        <main className="text-lg">
            <div>
                <p data-test="work-interval">Work Interval: {workInterval}</p>
                <p data-test="timestamp">
                    Timestamp: {timestamp}
                </p>
                <div className="p-20 text-center">
                    {riddleId && (
                        <Link data-test="riddle-control" to={`/riddle/${riddleId}`} className="border border-blue-500 p-5">
                            Resolve random riddle
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
};
