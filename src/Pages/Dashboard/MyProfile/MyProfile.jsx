import React, { useEffect, useState } from "react";
import { FaMedal } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import FallBack from "../../../Components/FallBack/FallBack";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import usePageTitle from "../../../Hooks/usePageTitle";

const MyProfile = () => {
    usePageTitle();
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [dbUser, setDbUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(dbUser);

    // Fetch user data from DB
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`single-users?email=${user.email}`)
                .then((res) => setDbUser(res.data))
                .catch((err) => console.error("User fetch failed", err));
        }
    }, [user]);

    // console.log(dbUser);

    // Fetch latest 5 posts with pagination
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(
                    `posts?email=${user.email}&page=${currentPage}&limit=5&sortBy=popularity`
                )
                .then((res) => {
                    setPosts(res.data);
                    setTotalPosts(res.data.length); // You should get the count of posts here
                })
                .catch((err) => console.error("Post fetch failed", err));
        }
    }, [user, currentPage]);

    const renderBadge = () => {
        if (!dbUser) return null;
        return dbUser?.isMember ? (
            <div className="badge bg-yellow-400 text-white flex items-center gap-1">
                <FaMedal className="text-white" /> Gold Member
            </div>
        ) : (
            <div className="badge bg-gray-400 text-white flex items-center gap-1">
                <FaMedal className="text-white" /> Bronze
            </div>
        );
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <FallBack />;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto mt-10">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <img
                    src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-primary"
                />
                <div>
                    <h2 className="text-3xl font-bold mb-1">{user?.displayName}</h2>
                    <p className="text-gray-600 mb-2">{user?.email}</p>
                    {renderBadge()}
                </div>
            </div>

            {/* Posts Section */}
            <div>
                <h3 className="text-xl font-semibold mb-4">📝 My Recent Posts</h3>
                {posts.length > 0 ? (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                className="border p-4 rounded-md bg-gray-50 shadow-sm"
                            >
                                <h4 className="font-semibold text-lg">{post.title}</h4>
                                <p className="text-sm text-gray-700 mt-1">
                                    {post.description?.slice(0, 100) || "No content"}...
                                </p>
                                <div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-2">
                                    <span>Tags: {post.tags?.join(", ") || "None"}</span>
                                    <span>• {new Date(post.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No recent posts found.</p>
                )}

                {/* Pagination Controls */}
                {totalPosts > 5 && (
                    <div className="mt-4">
                        <button
                            onClick={() => handlePagination(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn btn-outline"
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => handlePagination(currentPage + 1)}
                            className="btn btn-outline ml-2"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
