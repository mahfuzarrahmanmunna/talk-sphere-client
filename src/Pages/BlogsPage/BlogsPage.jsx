import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import FallBack from "../../Components/FallBack/FallBack";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import usePageTitle from "../../Hooks/usePageTitle";
import { motion } from "framer-motion";

const POSTS_PER_PAGE = 10;

const BlogsPage = () => {
    usePageTitle();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [sortBy, setSortBy] = useState("newest");
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosSecure.get(
                    `paginated-posts?page=${page}&limit=${POSTS_PER_PAGE}&sortBy=${sortBy}&search=${searchTerm}`
                );
                setPosts(response.data.posts);
                setTotalPosts(response.data.total);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            }
        };
        fetchPosts();
    }, [page, sortBy, searchTerm]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosSecure.get("tags");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return <FallBack />;

    return (
        <div className="relative overflow-hidden">
            {/* Background Vectors */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute w-40 h-40 bg-purple-400/30 rounded-full -top-20 -left-10"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 6 }}
                />
                <motion.div
                    className="absolute w-32 h-32 bg-pink-300/30 rounded-full -bottom-10 -right-10"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                />
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">📝 Blog</h1>
                    <p className="text-lg text-gray-600">
                        Welcome to our blog! Stay updated with the latest news, tutorials, and insights.
                    </p>
                </div>

                <div className="md:flex gap-8">
                    {/* Main Blog List */}
                    <div className="w-full lg:w-2/3 space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                            <button
                                onClick={() => setSortBy(sortBy === "newest" ? "popularity" : "newest")}
                                className="btn btn-outline btn-sm hover:bg-purple-500 hover:text-white transition"
                            >
                                Sort by: {sortBy === "newest" ? "Newest" : "Popularity"} ✨
                            </button>
                            <input
                                type="text"
                                placeholder="Search posts... 🔍"
                                className="input input-bordered input-sm w-full sm:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {posts.map((post) => (
                            <motion.div
                                key={post._id}
                                className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.authorImage}
                                            alt="author"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold">{post.authorName} 🧑‍💻</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {post.tags.map((t, i) => (
                                            <span key={i} className="mr-2">
                                                #{t} 🚀
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-semibold mb-3">{post.title} 📌</h3>
                                <p className="text-gray-700 mb-4">{post.description}</p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="text-purple-600 font-medium hover:underline"
                                >
                                    Read more →
                                </Link>
                            </motion.div>
                        ))}

                        {/* Pagination */}
                        <div className="flex justify-center mt-10 gap-4 items-center">
                            <button
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="btn btn-outline btn-sm"
                            >
                                Previous
                            </button>
                            <span className="text-sm font-semibold">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className="btn btn-outline btn-sm"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-1/3">
                        <div className="lg:sticky top-24 space-y-8">
                            {/* Categories */}
                            <div className="bg-white shadow-xl rounded-xl p-6">
                                <h3 className="text-xl font-semibold mb-4">Categories 📚</h3>
                                <ul>
                                    {categories.map((category, index) => (
                                        <li key={index} className="mb-2">
                                            <p className="text-blue-600 hover:underline cursor-pointer">
                                                {category.name} 🌟
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Recent Posts */}
                            <div className="bg-white shadow-xl rounded-xl p-6">
                                <h3 className="text-xl font-semibold mb-4">Recent Posts 📰</h3>
                                <ul>
                                    {posts.slice(0, 5).map((post) => (
                                        <li key={post._id} className="mb-4">
                                            <Link
                                                to={`/post/${post._id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {post.title} ✨
                                            </Link>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogsPage;
