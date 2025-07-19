import React from 'react';
import { useNavigate } from 'react-router';
import { FaPlusCircle, FaUserEdit, FaClipboardList } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';

const DashboardHome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-base-100 py-10 md:px-10">
            <h1 className="text-3xl font-bold text-primary mb-6">
                Welcome back, {user?.displayName?.split(' ')[0] || 'User'} 👋
            </h1>

            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex items-center gap-6">
                <img
                    src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-primary"
                />
                <div>
                    <h2 className="text-xl font-bold">{user?.displayName}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                    <span className="badge badge-outline mt-2">Dashboard User</span>
                </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow hover:shadow-xl cursor-pointer transition"
                    onClick={() => navigate('/dashboard/add-post')}
                >
                    <FaPlusCircle size={28} className="mb-4" />
                    <h3 className="text-lg font-semibold">Add New Post</h3>
                    <p className="text-sm opacity-90 mt-1">Share your thoughts with the community.</p>
                </div>

                <div
                    className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-lg shadow hover:shadow-xl cursor-pointer transition"
                    onClick={() => navigate('/dashboard/my-profile')}
                >
                    <FaUserEdit size={28} className="mb-4" />
                    <h3 className="text-lg font-semibold">Edit Profile</h3>
                    <p className="text-sm opacity-90 mt-1">Update your info & badges.</p>
                </div>

                <div
                    className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow hover:shadow-xl cursor-pointer transition"
                    onClick={() => navigate('/dashboard/my-posts')}
                >
                    <FaClipboardList size={28} className="mb-4" />
                    <h3 className="text-lg font-semibold">My Posts</h3>
                    <p className="text-sm opacity-90 mt-1">View and manage your posted content.</p>
                </div>
            </div>

            {/* Summary Section (Optional Enhancements) */}
            <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">📊 Dashboard Tips</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li>Stay consistent with your posts for better visibility.</li>
                    <li>Upgrade to member status to unlock more features.</li>
                    <li>Engage with others by commenting and voting.</li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardHome;
