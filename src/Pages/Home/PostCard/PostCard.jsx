// components/PostCard/PostCard.jsx
import React from 'react';
import { Link } from 'react-router';
import { FaArrowUp, FaArrowDown, FaComments } from 'react-icons/fa';

const PostCard = ({ post, index }) => {
    return (
        <div
            className="bg-base-100 shadow rounded-lg p-5 border hover:shadow-lg transition-all duration-300"
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
                {post.tags?.map((tag, i) => (
                    <span key={i} className="badge badge-outline badge-sm">#{tag}</span>
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
    );
};

export default PostCard;
