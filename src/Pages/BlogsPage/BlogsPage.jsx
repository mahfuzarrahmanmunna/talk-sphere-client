import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import FallBack from '../../Components/FallBack/FallBack';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const POSTS_PER_PAGE = 10;

const BlogsPage = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [sortBy, setSortBy] = useState('newest');
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    // Fetch posts with pagination and search
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosSecure.get(
                    `paginated-posts?page=${page}&limit=${POSTS_PER_PAGE}&sortBy=${sortBy}&search=${searchTerm}`
                );
                setPosts(response.data.posts);
                setTotalPosts(response.data.total);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };

        fetchPosts();
    }, [page, sortBy, searchTerm]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosSecure.get('tags');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortToggle = () => {
        setSortBy((prev) => (prev === 'newest' ? 'popularity' : 'newest'));
        setPage(1); // Reset to the first page when sorting changes
    };

    if (loading) {
        return <FallBack />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Blog</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Welcome to our blog! Stay updated with the latest news, tutorials, and insights.
                </p>
            </div>

            <div className="md:flex gap-8">
                {/* Main Content Section */}
                <div className="w-full lg:w-2/3">
                    {/* Filter Bar */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                        <button onClick={handleSortToggle} className="btn btn-outline btn-sm">
                            Sort by: {sortBy === 'newest' ? 'Newest' : 'Popularity'}
                        </button>
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="input input-bordered input-sm w-full sm:w-64"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>

                    {/* Blog Posts */}
                    <div className="space-y-8">
                        {posts.map((post) => (
                            <div key={post._id} className="bg-white shadow-lg rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={post.authorImage}
                                            alt="author"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold">{post.authorName}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(post.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">{post.tags.join(', ')}</div>
                                </div>

                                <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
                                <p className="text-gray-700 mb-4">{post.description}</p>

                                <Link to={`/post/${post._id}`} className="text-primary font-medium">
                                    Read more →
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-10 gap-4 items-center">
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="btn btn-outline btn-sm"
                        >
                            Previous
                        </button>
                        <span className="text-sm font-semibold">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="btn btn-outline btn-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Sidebar Section */}
                <div className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit">
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Categories</h3>
                        <ul>
                            {categories.map((category, index) => (
                                <li key={index} className="mb-2">
                                    <Link
                                        className="text-blue-600 hover:underline"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Posts</h3>
                        <ul>
                            {posts.slice(0, 5).map((post) => (
                                <li key={post._id} className="mb-4">
                                    <Link
                                        to={`/post/${post._id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {post.title}
                                    </Link>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {new Date(post.createdAt).toLocaleString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogsPage;
