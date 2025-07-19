import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { FaArrowUp, FaArrowDown, FaComments } from 'react-icons/fa';

const POSTS_PER_PAGE = 12;

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [sortBy, setSortBy] = useState("newest"); // or 'popularity'

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    useEffect(() => {
        axios.get(`http://localhost:3000/paginated-posts?page=${page}&limit=${POSTS_PER_PAGE}&sortBy=${sortBy}`)
            .then(res => {
                setPosts(res.data.posts);
                setTotalPosts(res.data.total);
                console.log(res.data.posts);
            })
            .catch(err => console.error('Error fetching paginated posts:', err));
    }, [page, sortBy]);

    const handlePrev = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(prev => prev + 1);
    };

    const handleSortToggle = () => {
        setSortBy(prev => prev === "newest" ? "popularity" : "newest");
        setPage(1); // Reset to first page when changing sort
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="md:text-3xl text-2xl font-bold">🔥 Forum Posts</h2>
                <button onClick={handleSortToggle} className="btn btn-sm btn-outline">
                    Sort by: {sortBy === "newest" ? "Newest" : "Popularity"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post._id} className="bg-base-100 shadow rounded-lg p-5 border hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                            <img src={post.authorImage} alt="author" className="w-10 h-10 rounded-full border object-cover" />
                            <div>
                                <p className="text-sm font-semibold">{post.authorName}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(post.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <Link to={`/post/${post._id}`}>
                            <h3 className="text-lg font-bold hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                        </Link>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {post.tags?.map((tag, index) => (
                                <span key={index} className="badge badge-outline badge-sm">#{tag}</span>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-between text-sm items-center">
                            <span className="flex items-center gap-1 text-green-600">
                                <FaArrowUp /> {post.upVote}
                            </span>
                            <span className="flex items-center gap-1 text-red-600">
                                <FaArrowDown /> {post.downVote}
                            </span>
                            <span className="flex items-center gap-1 text-blue-600">
                                <FaComments /> {post.commentCount || 0}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-10 gap-4 items-center">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="btn btn-outline btn-sm"
                >
                    Previous
                </button>
                <span className="text-sm font-semibold">Page {page} of {totalPages}</span>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="btn btn-outline btn-sm"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllPosts;
