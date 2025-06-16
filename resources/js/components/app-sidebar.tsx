import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { AlignEndHorizontal, BookOpen, Folder, Gamepad2 } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Game',
        href: '/game/easy',
        icon: Gamepad2,
    },
    {
        title: 'Leaderboard',
        href: '/game/leaderboard',
        icon: AlignEndHorizontal,
    },
];

const typingNavItems: NavItem[] = [
    {
        title: 'Game',
        href: '/typing/game',
        icon: Gamepad2,
    },
    {
        title: 'Leaderboard',
        href: '/typing/leaderboard',
        icon: AlignEndHorizontal,
    },
];

const minesNavItems: NavItem[] = [
    {
        title: 'Game',
        href: '/mines/game',
        icon: Gamepad2,
    },
    {
        title: 'Leaderboard',
        href: '/mines/leaderboard',
        icon: AlignEndHorizontal,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/lmoboy/iesmins_atceras',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://youtu.be/2ZwQpC4mIa8?si=6nTTSwH2tMQrs3Gv',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/game/easy" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} label="Card game" />
                <NavMain items={typingNavItems} label="Typing game" />
                {/* <NavMain items={minesNavItems} label="Mines game" /> */}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
