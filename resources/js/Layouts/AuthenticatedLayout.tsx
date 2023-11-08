import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/Components/ui/menubar"
  import { Users } from "lucide-react"

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-theme-850">
            <nav className="border-b border-1 border-theme-800">
                <div className="max-w-screen-2xl mx-auto px-4">
                    <div className="flex justify-between h-14">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block w-auto h-9 fill-current" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-8 sm:flex">
                                <NavLink href={route('casino')} active={route().current('casino')}>
                                    Casino
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-8 sm:flex">
                                <NavLink href={route('bonus')} active={route().current('bonus')}>
                                    Bonus
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Menubar>
                                    <MenubarMenu>
                                    <MenubarTrigger>\
                                        <span className="inline-flex rounded-md">
                                            <Users className="mr-2 mt-1 h-3 w-3" />{user.name}
                                        </span>
                                    </MenubarTrigger>
                                    <MenubarContent>
                                        <Link href={route('profile.edit')}>
                                            <MenubarItem>Profile<MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
                                        </Link>
                                        <MenubarSeparator />
                                        <MenubarSub>
                                        <MenubarSubTrigger>Support</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem>Email</MenubarItem>
                                            <MenubarItem>Chat</MenubarItem>
                                        </MenubarSubContent>
                                        </MenubarSub>
                                        <MenubarSeparator />
                                        <Link href={route('logout')}>
                                            <MenubarItem>Logout<MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
                                        </Link>
                                    </MenubarContent>
                                    </MenubarMenu>
                                </Menubar>

                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('casino')} active={route().current('')}>
                            Casino
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-theme-900 shadow">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>


        </div>

    );
}
