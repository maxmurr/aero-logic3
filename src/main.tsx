import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import './index.css';
import { ContextProvider } from './common/context';
import { provideRiddleAnswer } from './domain/riddle/riddle-answer-provider';
import { fetchAnswerForRiddle } from './domain/riddle/riddle-adapter';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ContextProvider providers={[provideRiddleAnswer(fetchAnswerForRiddle)]}>
            <App />
        </ContextProvider>
    </React.StrictMode>,
);
