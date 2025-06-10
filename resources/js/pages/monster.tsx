import { Debug } from '@/components/debug';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'monster',
        href: '/game/monster',
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
        { name: 'Card 1', color: 'red' },
        { name: 'Card 2', color: 'blue' },
        { name: 'Card 3', color: 'yellow' },
        { name: 'Card 4', color: 'green' },
        { name: 'Card 5', color: 'cyan' },
        { name: 'Card 6', color: 'pink' },
        { name: 'Card 7', color: 'purple' },
        { name: 'Card 8', color: 'white' },
        { name: 'Card 9', color: 'teal' },
        { name: 'Card 10', color: 'beige' },
        { name: 'Card 11', color: 'brown' },
        { name: 'Card 12', color: 'orange' },
        { name: 'Card 13', color: 'barbie pink' },
        { name: 'Card 14', color: 'lilac' },
        { name: 'Card 15', color: 'blood red' },
        { name: 'Card 16', color: 'magenta' },
        { name: 'Card 17', color: 'gold' },
        { name: 'Card 18', color: 'silver' },
        { name: 'Card 19', color: 'lime' },
        { name: 'Card 20', color: 'indigo' },
        { name: 'Card 21', color: 'violet' },
        { name: 'Card 22', color: 'black' },
        { name: 'Card 23', color: 'maroon' },
        { name: 'Card 24', color: 'navy' },
        { name: 'Card 25', color: 'olive' },
        { name: 'Card 26', color: 'turquoise' },
        { name: 'Card 27', color: 'peach' },
        { name: 'Card 28', color: 'periwinkle' },
        { name: 'Card 29', color: 'slate gray' },
        { name: 'Card 30', color: 'forest green' },
        { name: 'Card 31', color: 'royal blue' },
        { name: 'Card 32', color: 'crimson' },
        { name: 'Card 33', color: 'aquamarine' },
        { name: 'Card 34', color: 'chocolate' },
        { name: 'Card 35', color: 'lavender' },
        { name: 'Card 36', color: 'coral' },
        { name: 'Card 37', color: 'khaki' },
        { name: 'Card 38', color: 'plum' },
        { name: 'Card 39', color: 'tan' },
        { name: 'Card 40', color: 'sky blue' },
        { name: 'Card 41', color: 'chartreuse' },
        { name: 'Card 42', color: 'fuchsia' },
        { name: 'Card 43', color: 'amber' },
        { name: 'Card 44', color: 'ruby' },
        { name: 'Card 45', color: 'saffron' },
        { name: 'Card 46', color: 'emerald' },
        { name: 'Card 47', color: 'bronze' },
        { name: 'Card 48', color: 'pearl' },
        { name: 'Card 49', color: 'denim' },
        { name: 'Card 50', color: 'strawberry' },

        { name: 'Card 1', color: 'red' },
        { name: 'Card 2', color: 'blue' },
        { name: 'Card 3', color: 'yellow' },
        { name: 'Card 4', color: 'green' },
        { name: 'Card 5', color: 'cyan' },
        { name: 'Card 6', color: 'pink' },
        { name: 'Card 7', color: 'purple' },
        { name: 'Card 8', color: 'white' },
        { name: 'Card 9', color: 'teal' },
        { name: 'Card 10', color: 'beige' },
        { name: 'Card 11', color: 'brown' },
        { name: 'Card 12', color: 'orange' },
        { name: 'Card 13', color: 'barbie pink' },
        { name: 'Card 14', color: 'lilac' },
        { name: 'Card 15', color: 'blood red' },
        { name: 'Card 16', color: 'magenta' },
        { name: 'Card 17', color: 'gold' },
        { name: 'Card 18', color: 'silver' },
        { name: 'Card 19', color: 'lime' },
        { name: 'Card 20', color: 'indigo' },
        { name: 'Card 21', color: 'violet' },
        { name: 'Card 22', color: 'black' },
        { name: 'Card 23', color: 'maroon' },
        { name: 'Card 24', color: 'navy' },
        { name: 'Card 25', color: 'olive' },
        { name: 'Card 26', color: 'turquoise' },
        { name: 'Card 27', color: 'peach' },
        { name: 'Card 28', color: 'periwinkle' },
        { name: 'Card 29', color: 'slate gray' },
        { name: 'Card 30', color: 'forest green' },
        { name: 'Card 31', color: 'royal blue' },
        { name: 'Card 32', color: 'crimson' },
        { name: 'Card 33', color: 'aquamarine' },
        { name: 'Card 34', color: 'chocolate' },
        { name: 'Card 35', color: 'lavender' },
        { name: 'Card 36', color: 'coral' },
        { name: 'Card 37', color: 'khaki' },
        { name: 'Card 38', color: 'plum' },
        { name: 'Card 39', color: 'tan' },
        { name: 'Card 40', color: 'sky blue' },
        { name: 'Card 41', color: 'chartreuse' },
        { name: 'Card 42', color: 'fuchsia' },
        { name: 'Card 43', color: 'amber' },
        { name: 'Card 44', color: 'ruby' },
        { name: 'Card 45', color: 'saffron' },
        { name: 'Card 46', color: 'emerald' },
        { name: 'Card 47', color: 'bronze' },
        { name: 'Card 48', color: 'pearl' },
        { name: 'Card 49', color: 'denim' },
        { name: 'Card 50', color: 'strawberry' },
    ]);

    const declareWin = () => {
        if (errors > 25) {
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
                            <div>time elapsed: {timeElapsed}</div>
                            <div className="grid w-[80%] grid-cols-10 gap-4">
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
                                            comparing && index !== compared[0] ? '' : 'cursor-pointer'
                                        }`}
                                    >
                                        <div
                                            className="inset-shadow-2xl absolute top-0 left-0 h-full w-full rounded-xl bg-cover bg-center shadow-[0_0_1rem_#f7b733] shadow-black"
                                            style={{ backgroundImage: `url(/images/${card.color}.png)` }}
                                        />
                                        <div className="relative z-10 text-3xl font-bold">
                                            {(comparing && index === compared[0]) || (comparing && index === compared[1]) || guessed.includes(index)
                                                ? card.name
                                                : '?'}
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
