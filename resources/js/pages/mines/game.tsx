import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react'; // Make sure useEffect is imported

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mines',
        href: '/mines',
    },
];

export default function Game() {
    const auth: any = usePage().props.auth;
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const [startTime, setStartTime] = useState(new Date(Date.now()));
    const [timeElapsed, setTimeElapsed] = useState(0);

    const [playing, setPlaying] = useState(false);
    const [status, setStatus] = useState('');
    const [mineField, setMineField] = useState<number[][]>([]);
    const [openedField, setOpenedField] = useState<number[][]>([]);
    const isMine = (num: number) => {
        if (num == 9) return true;
        else return false;
    };

    const handleClick = (row: number, col: number) => {
        if (isMine(mineField[row][col])) {
            setStatus('Game Over');
            setPlaying(false);
        } else {
            const newOpenedField = [...openedField];
            if (!newOpenedField[row]) newOpenedField[row] = [];
            newOpenedField[row][col] = mineField[row][col];
            setOpenedField(newOpenedField);
        }
        console.log('Clicked on:', row, col);
        console.log('Mine field:', openedField[1][3]);
    };

    const openClosedField = (row: number, col: number) => {
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 0 && r < mineField.length && c >= 0 && c < mineField[0].length) {
                    if (!isMine(mineField[r][c]) && !openedField[r]?.[c]) {
                        handleClick(r, c);
                    }
                }
            }
        }
    };

    const generateMineField = (rows: number, cols: number, mines: number): number[][] => {
        const field: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
        let mineCount = 0;
        while (mineCount < mines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (field[row][col] !== 9) {
                field[row][col] = 9;
                mineCount++;
            }
        }
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (field[row][col] === 9) continue;
                let count = 0;
                for (let r = row - 1; r <= row + 1; r++) {
                    for (let c = col - 1; c <= col + 1; c++) {
                        if (r >= 0 && r < rows && c >= 0 && c < cols && field[r][c] === 9) {
                            count++;
                        }
                    }
                }
                field[row][col] = count;
            }
        }
        return field;
    };

    useEffect(() => {
        setMineField(generateMineField(5, 5, 6));
    }, []);

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
                        </p>
                    )}
                    <div className={playing ? `flex w-[50%] transition-all` : `flex w-full items-center justify-center`}>
                        {/* {playing ? ( */}
                        <div className="mx-auto h-full w-fit rounded-xl border-2">
                            <div className="grid h-full w-fit grid-cols-5 grid-rows-5 gap-2 p-2">
                                {mineField.map((row, rowIndex) =>
                                    row.map((cell, cellIndex) => (
                                        <div
                                            onClick={() => {
                                                openClosedField(rowIndex, cellIndex);
                                            }}
                                            key={`${rowIndex}-${cellIndex}`}
                                            className="flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800"
                                        >
                                            <span className={`text-xl font-bold`}>
                                                {openedField[rowIndex]?.[cellIndex] >= 0 ? (isMine(cell) ? '💣' : cell) : ''}
                                            </span>
                                        </div>
                                    )),
                                )}
                            </div>
                        </div>
                        {/* ) : ( */}
                        {/* <div className="flex w-full flex-col items-center justify-center gap-4">
                                <button
                                    onClick={() => {
                                        setPlaying(true);
                                    }}
                                    className="flex h-[150px] w-[60%] cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-[#f7b733] to-[#fc4a1a] p-4 shadow-md transition-all hover:scale-105"
                                >
                                    <div className="z-10 text-5xl font-bold text-white">START GAME</div>
                                </button>
                            </div> */}
                        {/* )} */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
