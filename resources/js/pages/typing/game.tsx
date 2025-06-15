import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react'; // Make sure useEffect is imported
import words from './words.js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Typing',
        href: '/typing',
    },
];

export default function Game() {
    const auth: any = usePage().props.auth;
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const [startTime, setStartTime] = useState(new Date(Date.now()));
    const [timeElapsed, setTimeElapsed] = useState(0);

    const [calculatedWPM, setCalculatedWPM] = useState(0);
    const [difficulty, setDifficulty] = useState(50);
    const [difficultyText, setDifficultyText] = useState('Easy');
    const [curLetter, setCurLetter] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [status, setStatus] = useState('');
    const [text, setText] = useState<Array<{ text: string; correct: string }>>(words(10));
    useEffect(() => {
        setText(words(difficulty));
    }, [difficulty]);
    const handleInput = (e: any) => {
        if (!playing) {
            return;
        }

        if (e.key === 'Space') {
            if (curLetter < text.length) {
                setText((prevText) => {
                    const newText = [...prevText];
                    newText[curLetter] = { ...newText[curLetter], correct: newText[curLetter].text === ' ' ? 'green' : 'red' };
                    return newText;
                });
                setCurLetter((prev) => prev + 1);
            }
            e.preventDefault();
        } else if (e.key === 'Backspace') {
            if (curLetter > 0) {
                setCurLetter((prev) => {
                    const newIndex = prev - 1;
                    setText((prevText) => {
                        const newText = [...prevText];
                        if (newIndex >= 0) {
                            newText[newIndex] = { ...newText[newIndex], correct: 'gray' };
                        }
                        return newText;
                    });
                    return newIndex;
                });
            } else {
                setCurLetter(0);
            }
        } else if (e.key.length >= 2) {
            return;
        } else {
            if (curLetter < text.length) {
                setText((prevText) => {
                    const newText = [...prevText];
                    const isCorrect = e.key === newText[curLetter].text;
                    newText[curLetter] = { ...newText[curLetter], correct: isCorrect ? 'green' : 'red' };
                    return newText;
                });
                setCurLetter((prev) => prev + 1);
            }
        }

        if (curLetter >= text.length - 1 && playing) {
            setStatus('Game Over!');
            setCalculatedWPM(Math.round(text.slice(0, curLetter).filter((char) => char.text === ' ').length / (timeElapsed / 60)));
            setCurLetter(0);
            const endTime = new Date(Date.now());
            const elapsedSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
            setTimeElapsed(elapsedSeconds);
            setPlaying(false);

            fetch(
                route('typing.leaderboard.store', {
                    name: auth.user.name,
                    mode: difficultyText.toLowerCase(),
                    score: timeElapsed,
                }),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken ?? '',
                    },
                },
            );
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleInput);
        return () => {
            document.removeEventListener('keydown', handleInput);
        };
    }, [handleInput]);

    useEffect(() => {
        let timer: any;
        if (playing) {
            setCurLetter(0);
            setStartTime(new Date(Date.now()));
            setTimeElapsed(0);
            setStatus('');
            setText((prevText) => prevText.map((char) => ({ ...char, correct: 'gray' })));

            timer = setInterval(() => {
                setTimeElapsed((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [playing]);

    // console.log(text);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Game" />
            {/* <Debug vars={{}} /> */}

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex min-h-[100vh] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 transition-all md:min-h-min dark:border-sidebar-border">
                    {status && (
                        <p className="absolute top-0 left-0 z-10 flex w-full items-center justify-center p-2 text-white">
                            <span className="text-center text-2xl font-bold">{status}</span>
                            <span className="text-2xl font-bold">Time: {timeElapsed}s</span>
                            <span className="ml-4 text-2xl font-bold">Words: {difficulty}</span>
                            <span className="ml-4 text-2xl font-bold">WPM: {calculatedWPM}</span>
                            <span className="ml-4 text-2xl font-bold">
                                Accuracy: {Math.round((text.filter((char) => char.correct === 'green').length / text.length) * 10000) / 100}%
                            </span>
                        </p>
                    )}
                    {!playing && (
                        <div className="top-0 left-0 z-10 flex w-full items-center justify-center p-2 text-white">
                            <span className="text-2xl font-bold">Difficulty: {difficultyText}</span>
                        </div>
                    )}
                    <div
                        style={{ transform: `translateX(-${curLetter * 1.4}rem)` }}
                        className={playing ? `flex w-[50%] transition-all` : `flex w-full items-center justify-center`}
                    >
                        {playing ? (
                            <>
                                {text.map((char: { text: string; correct: string }, index: number) => (
                                    <div
                                        key={index}
                                        className={`text-shadow-lg/30 text-shadow-white w-fit text-5xl font-bold transition-all ${char.text == ' ' && char.correct === 'red' ? 'bg-red-300' : ''} ${
                                            char.correct === 'green' ? 'text-green-300' : char.correct === 'red' ? 'text-red-300' : 'text-gray-300'
                                        } ${index === curLetter ? 'underline' : ''} `}
                                        dangerouslySetInnerHTML={{ __html: `${char.text == ' ' ? '&nbsp;' : char.text}` }}
                                    ></div>
                                ))}
                            </>
                        ) : (
                            <div className="flex w-full flex-col items-center justify-center gap-4">
                                <div className="flex flex-row gap-4">
                                    <button
                                        className={`rounded-lg border-2 border-gray-800 ${difficultyText == 'Easy' ? 'border-white' : ''} p-2 transition-all`}
                                        onClick={() => {
                                            setDifficulty(50);
                                            setDifficultyText('Easy');
                                        }}
                                    >
                                        Easy
                                    </button>
                                    <button
                                        className={`rounded-lg border-2 border-gray-800 ${difficultyText == 'Medium' ? 'border-white' : ''} p-2 transition-all`}
                                        onClick={() => {
                                            setDifficulty(100);
                                            setDifficultyText('Medium');
                                        }}
                                    >
                                        Medium
                                    </button>
                                    <button
                                        className={`rounded-lg border-2 border-gray-800 ${difficultyText == 'Hard' ? 'border-white' : ''} p-2 transition-all`}
                                        onClick={() => {
                                            setDifficulty(150);
                                            setDifficultyText('Hard');
                                        }}
                                    >
                                        Hard
                                    </button>
                                    <button
                                        className={`rounded-lg border-2 border-gray-800 ${difficultyText == 'Extreme' ? 'border-white' : ''} p-2 transition-all`}
                                        onClick={() => {
                                            setDifficulty(300);
                                            setDifficultyText('Extreme');
                                        }}
                                    >
                                        Extreme
                                    </button>
                                    {/* <button
                                        className={`rounded-lg border-2 border-gray-800 ${difficultyText == 'Dictionary' ? 'border-white' : ''} p-2 transition-all`}
                                        onClick={() => {
                                            setDifficulty(0);
                                            setDifficultyText('Dictionary');
                                        }}
                                    >
                                        Dictionary
                                    </button> */}
                                </div>
                                <button
                                    onClick={() => {
                                        setPlaying(true);
                                    }}
                                    className="flex h-[150px] w-[60%] cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-[#f7b733] to-[#fc4a1a] p-4 shadow-md transition-all hover:scale-105"
                                >
                                    <div className="z-10 text-5xl font-bold text-white">START GAME</div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
