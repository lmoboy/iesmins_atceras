import { Debug } from '@/components/debug';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'hard',
        href: '/game/hard',
    },
];

export default function Game() {
    const [startTime, setStartTime] = useState(new Date(Date.now()));
    const [playing, setPlaying] = useState(false);
    const [comparing, setComparing] = useState(false);
    const [guessed, setGuessed] = useState([]);
    const [errors, setErrors] = useState(0);
    const [compared, setCompared] = useState([-1, -1]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [status, setStatus] = useState('');
    const [cards, setCards] = useState([
        { name: '&#128512;', color: 'red' },
        { name: '&#128513;', color: 'blue' },
        { name: '&#128514;', color: 'yellow' },
        { name: '&#128515;', color: 'green' },
        { name: '&#128516;', color: 'cyan' },
        { name: '&#128517;', color: 'pink' },
        { name: '&#128518;', color: 'purple' },
        { name: '&#128519;', color: 'white' },
        { name: '&#128520;', color: 'teal' },
        { name: '&#128521;', color: 'beige' },
        { name: '&#128522;', color: 'brown' },
        { name: '&#128523;', color: 'orange' },
        { name: '&#128524;', color: 'barbie pink' },
        { name: '&#128525;', color: 'lilac' },
        { name: '&#128526;', color: 'blood red' },
        { name: '&#128527;', color: 'magenta' },
        { name: '&#128528;', color: 'gold' },
        { name: '&#128529;', color: 'silver' },

        { name: '&#128512;', color: 'red' },
        { name: '&#128513;', color: 'blue' },
        { name: '&#128514;', color: 'yellow' },
        { name: '&#128515;', color: 'green' },
        { name: '&#128516;', color: 'cyan' },
        { name: '&#128517;', color: 'pink' },
        { name: '&#128518;', color: 'purple' },
        { name: '&#128519;', color: 'white' },
        { name: '&#128520;', color: 'teal' },
        { name: '&#128521;', color: 'beige' },
        { name: '&#128522;', color: 'brown' },
        { name: '&#128523;', color: 'orange' },
        { name: '&#128524;', color: 'barbie pink' },
        { name: '&#128525;', color: 'lilac' },
        { name: '&#128526;', color: 'blood red' },
        { name: '&#128527;', color: 'magenta' },
        { name: '&#128528;', color: 'gold' },
        { name: '&#128529;', color: 'silver' },
    ]);

    const declareWin = () => {
        if (errors > 10) {
            setTimeElapsed(Math.round((Date.now() - startTime.getTime()) / 1000));
            setPlaying(false);
            setComparing(false);
            setGuessed([]);
            setCompared([-1, -1]);
            setErrors(0);
            setStatus('YOU LOST YA DUMB FUCK!!!! ');
        }

        if (guessed.length === cards.length) {
            setTimeElapsed(Math.round((Date.now() - startTime.getTime()) / 1000));
            setPlaying(false);
            setComparing(false);
            setGuessed([]);
            setCompared([-1, -1]);
            setErrors(0);
            setStatus('YOU WON!!!!');
        }
    };

    useEffect(() => {
        declareWin();
    }, [guessed]);

    const compare = (c1: number, c2: number) => {
        setTimeout(() => {
            setComparing(false);
            setCompared([-1, -1]);
        }, 1000);
        if (cards[c1].name === cards[c2].name) {
            setGuessed([...guessed, c1, c2]);
        } else {
            setErrors(errors + 1);
            declareWin();
        }
    };

    const shuffle = () => {
        setStatus('');
        setTimeElapsed(0);
        setStartTime(new Date(Date.now()));
        const shuffledCards = [...cards];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        setCards(shuffledCards);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Game" />
            <Debug vars={{ errors }} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {playing ? (
                    ''
                ) : (
                    <div>
                        {status} ALL WITHIN {timeElapsed} SECONDS!!!!
                    </div>
                )}
                <div className="relative flex min-h-[100vh] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {playing ? (
                        <>
                            {/* <div>time elapsed: {timeElapsed}</div> */}
                            <div className="grid w-[80%] grid-cols-6 gap-4">
                                {cards.map((card, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            if (compared[1] !== -1) return;
                                            if (guessed.includes(index)) {
                                                return;
                                            } else if (!comparing) {
                                                setCompared([index, -1]);
                                                setComparing(true);
                                            } else if (compared[0] !== index) {
                                                setCompared([compared[0], index]);
                                                compare(compared[0], index);
                                            }
                                        }}
                                        className={`relative flex h-[150px] w-full flex-col items-center justify-center rounded-xl bg-[#f7b733] p-4 shadow-md transition duration-300 ease-in-out hover:drop-shadow-[0_0_.5rem_#f7b733] ${
                                            comparing && index === compared[0] ? '' : 'cursor-pointer'
                                        }`}
                                    >
                                        <div
                                            className="inset-shadow-2xl absolute top-0 left-0 h-full w-full rounded-xl bg-cover bg-center shadow-[0_0_1rem_#f7b733] shadow-black"
                                            style={{ backgroundImage: `url(/images/${card.color}.png)` }}
                                        />
                                        <div className="relative z-10 text-3xl font-bold">
                                            {(comparing && index === compared[0]) ||
                                            (comparing && index === compared[1]) ||
                                            guessed.includes(index) ? (
                                                <span dangerouslySetInnerHTML={{ __html: card.name }} />
                                            ) : (
                                                '?'
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="absolute top-0 flex w-fit flex-row gap-4">
                                <Link href="/game/easy" prefetch>
                                    Easy
                                </Link>
                                <Link href="/game/medium" prefetch>
                                    Medium
                                </Link>
                                <Link href="/game/hard" prefetch>
                                    Hard
                                </Link>
                                <Link href="/game/monster" prefetch>
                                    Monster
                                </Link>
                            </div>
                            <button
                                onClick={() => {
                                    setPlaying(true);
                                    shuffle();
                                }}
                                className="relative flex h-[150px] w-[60%] cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-[#f7b733] to-[#fc4a1a] p-4 shadow-md transition duration-1000 ease-in-out hover:scale-105"
                            >
                                <div className="relative z-10 text-5xl font-bold text-white">START GAME</div>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
