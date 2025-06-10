import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'monster',
        href: '/game/monster',
    },
];

export default function Game() {
    const [cards, setCards] = useState([
        { name: 'Card 1', color: 'red' },
        { name: 'Card 2', color: 'blue' },
        { name: 'Card 1', color: 'red' },
        { name: 'Card 2', color: 'blue' },
    ]);

    const numCards = cards.length;
    const rows = Math.round(Math.sqrt(numCards));
    const cols = Math.round(numCards / rows);
    console.log(numCards, rows, cols);

    const shuffle = () => {
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
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative flex min-h-[100vh] flex-1 flex-col overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <header className="flex items-center justify-center">gametitle</header>

                    <footer className="flex items-center justify-center">other details</footer>
                </div>
            </div>
        </AppLayout>
    );
}
