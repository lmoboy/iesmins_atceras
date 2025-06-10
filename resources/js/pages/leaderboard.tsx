import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Crown } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'hard',
        href: '/game/hard',
    },
];

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [mode, setMode] = useState('*');
    useEffect(() => {
        fetch(route('leaderboard.index', mode))
            .then((res) => res.json())
            .then((data) => setLeaderboard(data));
    }, [mode]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leaderboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative flex min-h-[100vh] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="flex w-[40%] flex-col">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold">Leaderboard</h2>
                            <select
                                onChange={(e) => {
                                    setMode(e.target.value);
                                }}
                            >
                                <option value="*">All</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                                <option value="monster">Monster</option>
                            </select>
                        </div>
                        <ul className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                            {leaderboard.map((user, index) => (
                                <li key={index} className="flex items-center justify-between py-4">
                                    <span className="flex flex-row text-lg font-bold">
                                        {index === 0 && <Crown className="text-white" />}

                                        {user.name}
                                    </span>
                                    <span className="text-lg font-bold">{user.mode}</span>
                                    <span className="text-sm text-gray-500">{user.score}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
