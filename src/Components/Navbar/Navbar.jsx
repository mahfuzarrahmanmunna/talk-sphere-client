import React from 'react';
import { NavLink, Outlet } from 'react-router'; // ✅ Use 'react-router-dom' instead of 'react-router'
import { FaBars, FaBell } from 'react-icons/fa';
import TalkSphereLogo from '../TalkSphereLogo/TalkSphereLogo';

const Navbar = () => {
    const navLinks = (
        <>
            {['/', '/membership', '/dashboard/profile', '/join'].map((path, index) => {
                const names = ['Home', 'Membership', 'Dashboard', 'Join Us'];
                return (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-primary font-semibold border-b-2 border-primary transition'
                                : 'text-base-content hover:text-primary transition'
                        }
                    >
                        {names[index]}
                    </NavLink>
                );
            })}
        </>
    );

    return (
        <div className="min-h-screen bg-base-100">
            {/* Top Navbar */}
            <div className="navbar px-4 py-3 border-b border-base-300 shadow-sm">
                <div className="flex-1">
                    <NavLink to="/" className="text-xl font-bold flex items-center gap-2">
                        <TalkSphereLogo />
                    </NavLink>
                </div>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-6">{navLinks}</div>

                {/* Notification + Drawer for Mobile */}
                <div className="flex items-center gap-3 lg:hidden">
                    <FaBell className="w-5 h-5 text-base-content hover:text-primary cursor-pointer" />
                    <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-square">
                        <FaBars className="h-5 w-5" />
                    </label>
                </div>
            </div>

            {/* Mobile Drawer (Only shows on small devices) */}
            <div className="drawer drawer-mobile lg:hidden">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-4">
                    <Outlet />
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 bg-base-200 text-base-content space-y-3">
                        {navLinks}
                    </ul>
                </div>
            </div>

            {/* Main Content (desktop) */}
            <div className="hidden lg:block p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Navbar;
