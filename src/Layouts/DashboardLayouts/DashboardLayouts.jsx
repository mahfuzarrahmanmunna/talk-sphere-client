import { Link, NavLink, Outlet } from 'react-router';
import TalkSphereLogo from '../../Components/TalkSphereLogo/TalkSphereLogo';
import { BiLeftArrow } from 'react-icons/bi';
import { HiDotsVertical } from 'react-icons/hi';
import useAuth from '../../Hooks/useAuth';

const DashboardLayouts = () => {
    const { user } = useAuth();

    const navItems = [
        { to: '/dashboard/my-profile', label: 'My Profile' },
        { to: '/dashboard/add-post', label: 'Add Post' },
        { to: '/dashboard/my-posts', label: 'My Posts' },
    ];

    return (
        <div className="drawer lg:drawer-open min-h-screen">
            {/* Drawer Toggle Button (Small Devices) */}
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Small Device Navbar */}
                <div className="lg:hidden w-full navbar bg-base-200 shadow-md px-4 justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <BiLeftArrow size={20} className="text-primary" />
                        <TalkSphereLogo />
                    </Link>
                    <label htmlFor="dashboard-drawer" className="cursor-pointer">
                        <HiDotsVertical size={24} />
                    </label>
                </div>

                {/* Page Content */}
                <main className="p-6 bg-base-100 flex-1">
                    <Outlet />
                </main>
            </div>

            {/* Drawer Sidebar */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <aside className="w-64 min-h-full bg-base-200 shadow-lg p-4">
                    {/* Logo & Back to Home */}
                    

                    {/* User Info */}
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={user?.photoURL}
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <h2 className="text-lg font-semibold mt-2">{user?.displayName}</h2>
                    </div>

                    {/* Navigation Items */}
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
            </div>
        </div>
    );
};

export default DashboardLayouts;
