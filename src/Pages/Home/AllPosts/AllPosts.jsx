import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { FaArrowUp, FaArrowDown, FaComments } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const AllPosts = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/all-post"); // Update with live URL if needed
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center py-12">Loading posts...</p>;
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">📌 Latest Forum Posts</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, idx) => (
                    <div
                        key={post._id}
                        className="bg-base-100 shadow rounded-lg p-5 border hover:shadow-lg transition-all duration-300"
                        data-aos="fade-up"
                        data-aos-delay={idx * 100}
                    >
                        {/* Author Info */}
                        <div className="flex items-center gap-3 mb-3">
                            <img src={post.authorImage} alt="author" className="w-10 h-10 rounded-full border object-cover" />
                            <div>
                                <p className="text-sm font-semibold">{post.authorName}</p>
                                <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Post Title */}
                        <Link to={`/post/${post._id}`}>
                            <h3 className="text-lg font-bold hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                        </Link>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {post.tags?.map((tag, index) => (
                                <span key={index} className="badge badge-outline badge-sm">{tag}</span>
                            ))}
                        </div>

                        {/* Stats */}
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
        </section>
    );
};

export default AllPosts;
