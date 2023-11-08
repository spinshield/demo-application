import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1.5 border-b-2 text-sm font-semibold leading-5 transition duration-200 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-red-800/20 text-theme-100 focus:border-red-800/30'
                    : 'border-transparent hover:border-red-800/20 text-theme-200 hover:text-theme-50 focus:border-red-800/30') +
                className
            }
        >
            {children}
        </Link>
    );
}
