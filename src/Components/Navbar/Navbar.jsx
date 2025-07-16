import React from 'react';
import { NavLink } from 'react-router'; 
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
        <div className="navbar z-50 sticky top-0 px-4 py-3 border-b border-base-300 shadow-sm justify-between bg-base-100">
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
    );
};

export default Navbar;
