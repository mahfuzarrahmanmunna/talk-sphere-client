import { Link, NavLink } from 'react-router';
import { FaBars, FaBell } from 'react-icons/fa';
import TalkSphereLogo from '../TalkSphereLogo/TalkSphereLogo';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Navbar = () => {
    const { user, logout } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch announcement count
    const { data: count = 0 } = useQuery({
        queryKey: ['announcementCount'],
        queryFn: async () => {
            const res = await axiosSecure.get('announcements/count');
            return res.data.count;
        }
    });

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'text-primary font-semibold' : ''
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Membership"
                    className={({ isActive }) =>
                        isActive ? 'text-primary font-semibold' : ''
                    }
                >
                    Membership
                </NavLink>
            </li>
        </>
    );

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm px-4 py-3">
            {/* Left: Logo & Mobile Menu */}
            <div className="navbar-start">
                {/* Hamburger for mobile */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <FaBars className="h-5 w-5" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-1"
                    >
                        {links}
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/">
                    <TalkSphereLogo />
                </Link>
            </div>

            {/* Centered nav links on md+ */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    {links}
                </ul>
            </div>

            {/* Right: Notification + Avatar */}
            <div className="navbar-end flex items-center space-x-4">
                {/* 🔔 Notification Bell */}
                {count > 0 && (
                    <Link to="/announcements" className="relative">
                        <FaBell className="text-xl" />
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                            {count}
                        </span>
                    </Link>
                )}

                {user ? (
                    <div className="dropdown dropdown-end">
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
                        to="/login"
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
