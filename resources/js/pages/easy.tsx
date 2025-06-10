import { Debug } from '@/components/debug';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'easy',
        href: '/game/easy',
    },
];

export default function Game() {
    const [playing, setPlaying] = useState(false);
    const [comparing, setComparing] = useState(false);
    const [guessed, setGuessed] = useState([{}]);
    const [comparable, setComparable] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [cards, setCards] = useState([
        { name: 'Card 1', color: 'red' },
        { name: 'Card 2', color: 'blue' },
        { name: 'Card 1', color: 'red' },
        { name: 'Card 2', color: 'blue' },
    ]);

    const declareWin = () => {
        if (guessed.length === cards.length) {
            setPlaying(false);
            setComparing(false);
            setGuessed([]);
            setComparable(0);
            setTimeElapsed(0);
            shuffle();
        }
    };

    const compare = (c1: number, c2: number) => {
        setTimeout(() => {
            setComparing(false);
        }, 1000);
        // setComparing(false);
        if (c1 === c2) {
            setGuessed([...guessed, c1, c2]);
        }
    };

    const shuffle = () => {
        const shuffledCards = [...cards];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        setCards(shuffledCards);
        setInterval(() => {
            setTimeElapsed(timeElapsed + 1);
        }, 1000);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Game" />
            <Debug vars={{ cards, guessed, comparable, comparing, timeElapsed }} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative flex min-h-[100vh] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {playing ? (
                        <>
                            <div>time elapsed: {timeElapsed}</div>
                            <div className="grid w-100 grid-cols-2 gap-4">
                                {cards.map((card, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            if (!comparing) {
                                                setComparable(index);
                                                setComparing(true);
                                            } else if (comparable !== index) {
                                                setComparable(index);
                                                compare(comparable, index);
                                            }
                                        }}
                                        className={`relative flex h-[150px] w-full flex-col items-center justify-center rounded-xl bg-[#f7b733] p-4 shadow-md transition duration-300 ease-in-out hover:drop-shadow-[0_0_.5rem_#f7b733] ${
                                            comparing && index === comparable ? '' : 'cursor-pointer'
                                        }`}
                                    >
                                        <div
                                            className="inset-shadow-2xl absolute top-0 left-0 h-full w-full rounded-xl bg-cover bg-center shadow-[0_0_1rem_#f7b733] shadow-black"
                                            style={{ backgroundImage: `url(/images/${card.color}.png)` }}
                                        />
                                        <div className="relative z-10 text-3xl font-bold">{comparing && index === comparable ? card.name : '?'}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                setPlaying(true);
                                shuffle();
                            }}
                            className="relative flex h-[150px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#f7b733] to-[#fc4a1a] p-4 shadow-md"
                        >
                            <div className="relative z-10 text-5xl font-bold text-white">START GAME</div>
                        </button>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
