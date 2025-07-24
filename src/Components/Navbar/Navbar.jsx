import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FaBars, FaBell } from 'react-icons/fa';
import TalkSphereLogo from '../TalkSphereLogo/TalkSphereLogo';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logout } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // 🔔 Fetch announcement count
    const { data: count = 0 } = useQuery({
        queryKey: ['announcementCount'],
        queryFn: async () => {
            const res = await axiosSecure.get('announcements/count');
            return res.data.count;
        },
        enabled: !!user,
    });

    // 📜 Fetch announcements
    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('announcements');
            return res.data;
        },
        enabled: isDropdownOpen && !!user,
        onError: (err) => {
            console.error('Error fetching announcements:', err);
        }
    });

    const handleLogout = async () => {
        try {
            await logout();
            Swal.fire({
                icon: 'success',
                title: 'Logged out!',
                text: 'You have been successfully logged out.',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        } catch (err) {
            console.error("Logout error:", err);
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong during logout.",
            });
        }
    };

    const links = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'text-primary' : ''}
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/Membership"
                className={({ isActive }) => isActive ? 'text-primary' : ''}
            >
                Membership
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/blog"
                className={({ isActive }) => isActive ? 'text-primary' : ''}
            >
                Blogs
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/about"
                className={({ isActive }) => isActive ? 'text-primary' : ''}
            >
                About Us
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? 'text-primary' : ''}
            >
                Contact Us
            </NavLink>
        </li>

    </>

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm px-4 py-3">
            {/* Left Section */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <FaBars className="h-5 w-5" />
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-1">
                        {links}
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/">
                    <TalkSphereLogo />
                </Link>
            </div>

            {/* Center Nav Links */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    {links}
                </ul>
            </div>

            {/* Right: Notification & User */}
            <div className="navbar-end flex items-center  space-x-4">
                {/* 🔔 Bell + Announcements */}
                {user && count > 0 && (
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="text-xl relative"
                        >
                            <FaBell />
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                                {count}
                            </span>
                        </button>

                        {/* 📥 Fancy Dropdown */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto p-4">
                                <h3 className="font-semibold text-lg mb-2 border-b pb-2">📢 Announcements</h3>
                                {announcements.length === 0 ? (
                                    <p className="text-sm text-gray-500">No announcements available.</p>
                                ) : (
                                    <ul className="space-y-3">
                                        {announcements.slice(0, 5).map((a) => (
                                            <li key={a._id} className="flex gap-3 border rounded-md p-2 hover:bg-gray-50 transition">
                                                <img
                                                    src={a.authorImage || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                                                    alt="Author"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div className="text-sm">
                                                    <h4 className="font-bold">{a.title}</h4>
                                                    <p className="text-gray-600 text-xs line-clamp-2">{a.description}</p>
                                                    <span className="text-gray-400 text-[11px]">By {a.authorName}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* 👤 User Avatar */}
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
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="text-base-content font-semibold pointer-events-none px-2">{user.displayName}</li>
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
