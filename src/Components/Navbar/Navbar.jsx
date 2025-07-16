import React from 'react';
import { NavLink } from 'react-router'; // ✅ react-router-dom
import { FaBars } from 'react-icons/fa';
import TalkSphereLogo from '../TalkSphereLogo/TalkSphereLogo';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();



    const links = <>
        <li >
            <NavLink
                to='/'
                className={({ isActive }) =>
                    isActive ? 'text-primary font-semibold' : ''
                }
            >
                Home
            </NavLink>
        </li>
        <li >
            <NavLink
                to='/Membership'
                className={({ isActive }) =>
                    isActive ? 'text-primary font-semibold' : ''
                }
            >
                Membership
            </NavLink>
        </li>
    </>

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm px-4 py-3">
            {/* Start: Logo + Mobile Menu */}
            <div className="navbar-start">
                {/* Hamburger dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <FaBars className="h-5 w-5" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-1"
                    >
                        {links}
                        {user && (
                            <>
                                <li><NavLink to="/dashboard/profile">Dashboard</NavLink></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Logo */}
                <NavLink to="/" className="">
                    <TalkSphereLogo />
                </NavLink>
            </div>

            {/* Center nav links for lg+ */}
            {/* Right side nav links for lg+ */}
            <div className="navbar-end hidden lg:flex items-center space-x-4">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    {links}
                </ul>

                {/* Show avatar dropdown on small screens too */}

                {user ? (
                    <div className="dropdown dropdown-end ml-2">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-9 rounded-full">
                                <img
                                    src={user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                                    alt="user"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li className="text-base-content font-semibold pointer-events-none px-2">
                                {user.displayName}
                            </li>
                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <NavLink
                        to='/login'
                        className={({ isActive }) =>
                            isActive ? 'text-primary font-semibold' : ''
                        }
                    >
                        Join us
                    </NavLink>
                )}


            </div>
        </div>
    );
};

export default Navbar;
