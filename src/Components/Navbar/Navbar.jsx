import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/membership', label: 'Membership' },
        { path: '/dashboard/profile', label: 'Dashboard' },
        { path: '/post-forum', label: 'Add Post' },
        { path: '/login', label: 'Join Us' },
    ];

    return (
        <div className="min-h-screen bg-base-100">
            {/* Top navbar */}
            <div className="navbar px-4 py-3 border-b border-base-300 shadow-sm justify-between">
                <NavLink to="/" className="text-xl font-bold text-primary">TalkSphere</NavLink>

                {/* Desktop nav */}
                <div className="hidden lg:flex gap-6 items-center">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-primary font-semibold border-b-2 border-primary'
                                    : 'text-base-content hover:text-primary'
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile drawer toggle */}
                <div className="lg:hidden">
                    <label htmlFor="mobile-drawer" className="btn btn-ghost btn-square">
                        <FaBars className="h-5 w-5" />
                    </label>
                </div>
            </div>

            {/* Drawer for mobile */}
            <div className="drawer lg:hidden">
                <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />
                </div>
                <div className="drawer-side z-40">
                    <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 min-h-screen bg-base-200 text-base-content space-y-3">
                        {navLinks.map(link => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive ? 'text-primary font-semibold' : 'hover:text-primary'
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Page content */}
            <div className="hidden lg:block px-4 py-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Navbar;
