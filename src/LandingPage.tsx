import { Link } from 'react-router-dom';
import { useLandingPage } from './use-landing-page';

export const LandingPage = () => {
    const { workInterval, timestamp, riddleId } = useLandingPage();

    return (
        <main className="text-lg">
            <div>
                <p>Work Interval: {workInterval}</p>
                <p>
                    Timestamp: {timestamp}
                </p>
                <div className="p-20 text-center">
                    {riddleId && (
                        <Link to={`/riddle/${riddleId}`} className="border border-blue-500 p-5">
                            Resolve random riddle
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
};
