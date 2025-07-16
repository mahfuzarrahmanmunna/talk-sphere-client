import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMedal } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';

const MyProfile = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [dbUser, setDbUser] = useState(null);

    // Fetch user info from DB
    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/users/${user.email}`)
                .then(res => setDbUser(res.data))
                .catch(err => console.error("User fetch failed", err));
        }
    }, [user]);

    // Fetch recent posts
    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/posts?email=${user.email}&limit=3`)
                .then(res => setPosts(res.data))
                .catch(err => console.error("Post fetch failed", err));
        }
    }, [user]);

    const getBadge = () => {
        if (dbUser?.isMember) {
            return (
                <div className="badge badge-warning text-white flex items-center gap-2 text-sm">
                    <FaMedal className="text-yellow-500" /> Gold Member
                </div>
            );
        } else {
            return (
                <div className="badge badge-neutral flex items-center gap-2 text-sm">
                    <FaMedal className="text-bronze-500" /> Bronze
                </div>
            );
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto mt-10">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <img
                    src={user?.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-primary"
                />
                <div>
                    <h2 className="text-3xl font-bold mb-1">{user?.displayName}</h2>
                    <p className="text-gray-600 mb-2">{user?.email}</p>
                    {getBadge()}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4">📝 My Recent Posts</h3>
                {posts.length > 0 ? (
                    <div className="space-y-4">
                        {posts.map(post => (
                            <div key={post._id} className="border p-4 rounded-md bg-gray-50 shadow-sm">
                                <h4 className="font-semibold text-lg">{post.title}</h4>
                                <p className="text-sm text-gray-700 mt-1">{post.content.slice(0, 100)}...</p>
                                <p className="text-xs text-gray-500 mt-2">Tags: {post.tags?.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No recent posts found.</p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;