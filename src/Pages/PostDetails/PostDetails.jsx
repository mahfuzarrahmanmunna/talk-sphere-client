import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PostDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    // Fetch post details
    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['postDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`posts/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    // Fetch comments
    const { data: comments = [] } = useQuery({
        queryKey: ['comments', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`comments/post/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    // Upvote with optimistic update
    const upvoteMutation = useMutation({
        mutationFn: async () => {
            await axiosSecure.patch(`upvote/posts/${id}`);
        },
        onMutate: async () => {
            await queryClient.cancelQueries(['postDetails', id]);
            const previousPost = queryClient.getQueryData(['postDetails', id]);
            if (previousPost) {
                queryClient.setQueryData(['postDetails', id], {
                    ...previousPost,
                    upVote: (previousPost.upVote || 0) + 1,
                });
            }
            return { previousPost };
        },
        onError: (_, __, context) => {
            if (context?.previousPost) {
                queryClient.setQueryData(['postDetails', id], context.previousPost);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['postDetails', id]);
        }
    });

    // Downvote with optimistic update
    const downvoteMutation = useMutation({
        mutationFn: async () => {
            await axiosSecure.patch(`downvote/posts/${id}`);
        },
        onMutate: async () => {
            await queryClient.cancelQueries(['postDetails', id]);
            const previousPost = queryClient.getQueryData(['postDetails', id]);
            if (previousPost) {
                queryClient.setQueryData(['postDetails', id], {
                    ...previousPost,
                    downVote: (previousPost.downVote || 0) + 1,
                });
            }
            return { previousPost };
        },
        onError: (_, __, context) => {
            if (context?.previousPost) {
                queryClient.setQueryData(['postDetails', id], context.previousPost);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['postDetails', id]);
        }
    });

    // Comment mutation
    const commentMutation = useMutation({
        mutationFn: async () => {
            const newComment = {
                postId: id,
                userName: user?.displayName,
                email: user?.email,
                comment,
                createdAt: new Date(),
            };
            await axiosSecure.post("comments", newComment);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', id]);
            setComment("");
        }
    });

    if (isLoading) return <div className="text-center mt-10">Loading post...</div>;
    if (isError || !post) return <div className="text-center mt-10 text-red-500">Failed to load post.</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 bg-white shadow-lg rounded-lg">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
                <p className="text-sm text-gray-500">By {post.authorName} • {new Date(post.createdAt).toLocaleString()}</p>
                <div className="mt-2 text-sm text-blue-500 space-x-2">
                    {post.tags?.map((tag, idx) => (
                        <span key={idx} className="badge badge-outline">#{tag}</span>
                    ))}
                </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>

            <div className="flex items-center gap-6 border-t pt-4">
                <button onClick={() => upvoteMutation.mutate()} className="flex items-center gap-2 text-green-600">
                    <FaRegThumbsUp /> <span>{post.upVote || 0}</span>
                </button>
                <button onClick={() => downvoteMutation.mutate()} className="flex items-center gap-2 text-red-500">
                    <FaRegThumbsDown /> <span>{post.downVote || 0}</span>
                </button>

                <div className="ml-auto flex gap-3">
                    <FacebookShareButton url={window.location.href} quote={post.title}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href} title={post.title}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">💬 Comments</h2>

                {user ? (
                    <div className="mt-4">
                        <textarea
                            className="textarea textarea-bordered w-full mb-2"
                            rows={3}
                            placeholder="Write your comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button
                            className="btn btn-primary"
                            onClick={() => commentMutation.mutate()}
                            disabled={!comment.trim()}
                        >
                            Comment
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500">You must <Link to="/login" className="text-blue-600">log in</Link> to comment.</p>
                )}

                <ul className="mt-6 space-y-4">
                    {comments.map(c => (
                        <li key={c._id} className="border rounded p-3 bg-gray-50">
                            <p className="font-semibold">{c.userName} <span className="text-sm text-gray-500">• {new Date(c.createdAt).toLocaleString()}</span></p>
                            <p>{c.comment}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostDetails;
