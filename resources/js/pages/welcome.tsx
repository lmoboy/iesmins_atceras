import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('game.easy')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Game
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex w-full items-center justify-center lg:justify-start">
                            <div className="ml-6">
                                <h1 className="animate-pulse text-[100px] leading-tight font-bold">Iesmiņš atcerās</h1>
                                <p className="mt-2 text-[20px] text-gray-600 dark:text-gray-400">
                                    <span>This is a simple project website Sir Iesmiņš asked us to do for the remained of our classes.</span>
                                    <br />
                                    <br />

                                    <span>
                                        The game in here is a simple card guessing game, pick a pair, if they match you are gucci, if they don't? You
                                        get scored an error and for each difficulty there is a set ammount of errors you can get, after that.... DEATH
                                    </span>
                                    <br />
                                    <br />
                                    <span>
                                        Currently supporting of up to 4 difficulty modes, each harder than previous ones. The modes are as followed by
                                        IQ scale
                                    </span>
                                    <div className="flex h-fit w-fit flex-col gap-2 border p-2">
                                        <span className="rounded-sm bg-gradient-to-r from-[#00c6ff] to-[#0072ff] px-1.5 text-white">
                                            easy: musars mode (0 IQ required)
                                        </span>
                                        <span className="rounded-sm bg-gradient-to-r from-[#0072ff] to-[#009688] px-1.5 text-white">
                                            medium: Eihentāls mode (20 IQ required)
                                        </span>
                                        <span className="rounded-sm bg-gradient-to-r from-[#009688] to-[#ff8c00] px-1.5 text-white">
                                            hard: Iesmiņš mode (110 IQ required)
                                        </span>
                                        <span className="rounded-sm bg-gradient-to-r from-[#ff8c00] to-[#ff3737] px-1.5 text-white">
                                            monster: Raivo mode (150+ IQ required)
                                        </span>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
