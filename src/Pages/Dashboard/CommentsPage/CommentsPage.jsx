// src/pages/CommentsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import usePageTitle from '../../../Hooks/usePageTitle';

const CommentsPage = () => {
    usePageTitle();
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`comments/post/${postId}`)
            .then(res => setComments(res.data))
            .catch(err => console.error("Failed to fetch comments", err));
    }, [postId]);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white mt-10 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">💬 All Comments</h2>
            {comments.length > 0 ? (
                <ul className="space-y-4">
                    {comments.map(comment => (
                        <li key={comment._id} className="border rounded p-4 bg-gray-50">
                            <p className="font-semibold">{comment.userName}</p>
                            <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                            <p className="mt-2">{comment.comment}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No comments yet for this post.</p>
            )}
        </div>
    );
};

export default CommentsPage;
