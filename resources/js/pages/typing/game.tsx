import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react'; // Make sure useEffect is imported
import words from './words.js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'easy',
        href: '/typing',
    },
];

export default function Game() {
    const auth = usePage().props.auth;
    const [difficulty, setDifficulty] = useState('easy');
    const [startTime, setStartTime] = useState(new Date(Date.now()));
    const [curLetter, setCurLetter] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState('');
    const [text, setText] = useState<Array<{ text: string; correct: string }>>(words(100));

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

        if (curLetter + 1 >= text.length && playing) {
            const allTyped = text.every((char) => char.correct === 'green');

            if (allTyped && curLetter + 1 === text.length) {
                setPlaying(false);
                setStatus('Game Over!');
                const endTime = new Date(Date.now());
                const elapsedSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
                console.log(allTyped, curLetter + 1 === text.length);
                setTimeElapsed(elapsedSeconds);
            }
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
            {/* <Debug vars={{ errors }} /> */}

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {status && <div className="text-center text-2xl font-bold">{status}</div>}
                {status && <div className="text-center text-2xl font-bold">Within {timeElapsed} seconds</div>}

                <div className="flex min-h-[100vh] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 transition-all md:min-h-min dark:border-sidebar-border">
                    <div className={`flex w-[50%] transition-all`} style={{ transform: `translateX(-${curLetter * 1.4}rem)` }}>
                        {playing ? (
                            <>
                                {text.map((char: { text: string; correct: string }, index: number) => (
                                    <div
                                        key={index}
                                        className={`text-shadow-lg/30 text-shadow-white  text-5xl font-bold transition-all ${
                                            char.correct === 'green' ? 'text-green-300' : char.correct === 'red' ? 'text-red-300' : 'text-gray-300'
                                        } ${index === curLetter ? 'underline' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: `${char.text == ' ' ? '&nbsp;' : char.text}` }}
                                    ></div>
                                ))}
                            </>
                        ) : (
                            <>
                                <div className="absolute top-0 flex w-fit flex-row gap-4">{/* <button onClick={setDifficulty}>Easy</button> */}</div>
                                <button
                                    onClick={() => {
                                        setPlaying(true);
                                    }}
                                    className="relative flex h-[150px] w-[60%] cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-[#f7b733] to-[#fc4a1a] p-4 shadow-md transition duration-1000 ease-in-out hover:scale-105"
                                >
                                    <div className="relative z-10 text-5xl font-bold text-white">START GAME</div>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
