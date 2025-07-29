import { Link, NavLink, Outlet } from 'react-router';
import TalkSphereLogo from '../../Components/TalkSphereLogo/TalkSphereLogo';
import { BiLeftArrow } from 'react-icons/bi';
import { HiDotsVertical } from 'react-icons/hi';
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';

const DashboardLayouts = () => {
    const { user } = useAuth();
    const { role, loading } = useUserRole();

    // Define navigation items for user
    const userNavItems = [
        { to: '/dashboard/my-profile', label: 'My Profile' },
        { to: '/dashboard/add-post', label: 'Add Post' },
        { to: '/dashboard/my-posts', label: 'My Posts' },
    ];

    // Define additional navigation items for admin
    const adminNavItems = [
        { to: '/dashboard/admin-profile', label: 'Admin Profile' },
        { to: '/dashboard/add-post', label: 'Add Post' },
        { to: '/dashboard/my-posts', label: 'My Posts' },
        { to: '/dashboard/manage-users', label: 'Manage Users' },
        { to: '/dashboard/reported-comments', label: 'Reported Comments/Activities' },
        { to: '/dashboard/make-announcement', label: 'Make Announcement' },
    ];

    return (
        <div className="drawer lg:drawer-open min-h-screen bg-base-100">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* Main Content Area */}
            <div className="drawer-content flex flex-col">
                {/* Mobile Navbar */}
                <div className="lg:hidden navbar bg-base-200 shadow-md sticky top-0 px-4 z-40 justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <BiLeftArrow size={20} className="text-primary" />
                        <TalkSphereLogo />
                    </Link>
                    <label htmlFor="dashboard-drawer" className="cursor-pointer">
                        <HiDotsVertical size={24} />
                    </label>
                </div>

                <main className="p-6">
                    {/* Render Admin or User Dashboard based on user role */}
                    <Outlet />
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-40">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <aside className="w-72 min-h-full bg-base-200 border-r shadow-md p-4 flex flex-col justify-between">

                    {/* Logo */}
                    <div>
                        <Link to="/" className="hidden lg:flex items-center gap-2 mb-6">
                            <TalkSphereLogo />
                        </Link>



                        {/* Navigation Menu */}
                        <nav className="space-y-2">
                            {!loading && role === 'admin' ? (
                                // If the user is an admin, show admin-specific links
                                adminNavItems.map(item => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `block px-4 py-2 rounded transition duration-200 ${isActive
                                                ? 'bg-primary text-white font-medium'
                                                : 'hover:bg-primary hover:text-white text-gray-700'
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                ))
                            ) : (
                                // If the user is a regular user, show user-specific links
                                userNavItems.map(item => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `block px-4 py-2 rounded transition duration-200 ${isActive
                                                ? 'bg-primary text-white font-medium'
                                                : 'hover:bg-primary hover:text-white text-gray-700'
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                ))
                            )}
                        </nav>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 text-center text-xs text-gray-400">
                        {/* User Profile */}
                        <div className="flex flex-col items-center text-center mb-8">
                            <img
                                src={user?.photoURL || '/default-avatar.png'}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-4 border-primary"
                            />
                            <h2 className="text-lg font-bold mt-3">{user?.displayName}</h2>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                        © {new Date().getFullYear()} TalkSphere. All rights reserved.
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayouts;
