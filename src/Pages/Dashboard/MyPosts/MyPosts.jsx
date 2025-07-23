import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import usePageTitle from '../../../Hooks/usePageTitle';

const MyPosts = () => {
    usePageTitle();
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // Fetch user-specific posts
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`posts?email=${user.email}`)
                .then(res => setPosts(res.data))
                .catch(err => console.error("Failed to fetch posts:", err));
        }
    }, [user]);

    // console.log(posts);

    // Handle Delete
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`posts/${id}`);
                setPosts(posts.filter(post => post._id !== id));
                Swal.fire('Deleted!', 'Your post has been removed.', 'success');
            } catch (err) {
                console.error("Delete failed:", err);
                Swal.fire('Error!', 'Failed to delete post.', 'error');
            }
        }
    };

    // Toggle visibility
    const toggleVisibility = async (id, currentVisibility) => {
        try {
            await axiosSecure.patch(`posts/${id}`, {
                visibility: currentVisibility === 'Public' ? 'Private' : 'Public'
            });

            setPosts(posts.map(post =>
                post._id === id
                    ? { ...post, visibility: currentVisibility === 'Public' ? 'Private' : 'Public' }
                    : post
            ));
        } catch (err) {
            console.error("Visibility update failed:", err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-base-100 rounded shadow mt-10">
            <h2 className="text-3xl font-bold text-primary mb-6">📚 My Posts</h2>

            {posts.length === 0 ? (
                <p className="text-gray-500">You haven’t posted anything yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Votes</th>
                                <th>Visibility</th>
                                <th>Comments</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => (
                                <tr key={post._id}>
                                    <td className="font-semibold">{post.title}</td>
                                    <td>{post.upVote - post.downVote}</td>
                                    <td>
                                        <button
                                            onClick={() => toggleVisibility(post._id, post.visibility)}
                                            className={`btn btn-sm ${post.visibility === 'Private' ? 'btn-warning' : 'btn-outline'}`}
                                        >
                                            {post.visibility || 'Public'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-info"
                                            onClick={() => navigate(`/dashboard/comments/${post._id}`)}
                                        >
                                            View Comments
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleDelete(post._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyPosts;
