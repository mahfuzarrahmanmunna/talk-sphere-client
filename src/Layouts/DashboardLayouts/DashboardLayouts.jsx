import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
// import useAuth from '../../Hooks/useAuth';
import TalkSphereLogo from '../../Components/TalkSphereLogo/TalkSphereLogo';
import { BiLeftArrow } from 'react-icons/bi';

const DashboardLayouts = () => {
    // const { user } = useAuth();

    const navItems = [
        { to: '/dashboard/my-profile', label: 'My Profile' },
        { to: '/dashboard/add-post', label: 'Add Post' },
        { to: '/dashboard/my-posts', label: 'My Posts' },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-base-200 shadow-lg  p-4">
                <Link className="mb-6 flex items-center">
                    <BiLeftArrow size={25} className='text-primary' />
                    <TalkSphereLogo />
                </Link>

                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'block p-2 rounded bg-primary text-white font-medium'
                                        : 'block p-2 rounded hover:bg-primary hover:text-white'
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-base-100">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayouts;
