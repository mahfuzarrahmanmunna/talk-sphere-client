import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import FallBack from '../../../Components/FallBack/FallBack';

const AddPost = () => {
    const navigate = useNavigate();
    const [userPostCount, setUserPostCount] = useState(0);
    const [tagOptions, setTagOptions] = useState([]);
    const [userData, setUserData] = useState(null); // New state for user data
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(userData);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm();

    // Fetch user data when the page loads
    useEffect(() => {
        // Fetch user data and check if they're a member
        if (user?.email) {
            axiosSecure.get(`single-users?email=${user.email}`)
                .then(response => {
                    const updatedUser = response.data;
                    setUserData(updatedUser);

                    // Check if the user is a member and can post more
                    if (updatedUser.isMember) {
                        // Allow the user to create more posts without limit
                        setUserPostCount(0); // Reset post count if they are a member
                    }
                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                });
        }
    }, [user?.email, axiosSecure]);


    // 🔄 Fetch user's post count
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`posts/count?email=${user.email}`)
                .then(res => setUserPostCount(res.data.count))
                .catch(err => console.error("Post count fetch error:", err));
        }
    }, [user?.email]);

    // 🔄 Load available tags from backend
    useEffect(() => {
        axiosSecure.get('tags')
            .then(res => {
                const options = res.data.map(tag => ({
                    label: tag.name,
                    value: tag.name
                }));
                setTagOptions(options);
            })
            .catch(err => console.error("Tag fetch error:", err));
    }, [axiosSecure]);

    //  Submit form handler
    const onSubmit = async (data) => {
        const selectedTags = data.tags.map(tag => tag.value);

        const newPost = {
            authorName: user.displayName,
            authorEmail: user.email,
            authorImage: user.photoURL,
            title: data.title,
            description: data.description,
            tags: selectedTags,
            upVote: 0,
            downVote: 0,
            createdAt: new Date()
        };

        try {
            await axiosSecure.post('posts', newPost);
            reset();

            const existingTagValues = tagOptions.map(tag => tag.value);
            const newTagValues = selectedTags.filter(tag => !existingTagValues.includes(tag));
            if (newTagValues.length > 0) {
                await axiosSecure.post('tags/bulk-create', { tags: newTagValues });
            }

            navigate('/dashboard/my-posts');
        } catch (err) {
            console.error("Post submission failed:", err);
        }
    };

    // Restrict free users to 5 posts, allow unlimited posts for Gold Members
    if (userData && userPostCount >= 5 && !userData.isMember) {
        return (
            <div className="p-6 text-center bg-base-100 shadow rounded-lg max-w-xl mx-auto mt-10">
                <h2 className="text-2xl font-bold mb-4 text-error">🚫 Post Limit Reached</h2>
                <p className="mb-6 text-gray-600">As a free user, you can only add up to 5 posts.</p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/membership')}
                >
                    Become a Member
                </button>
            </div>
        );
    }

    if (loading) return <FallBack />;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary border-b pb-4">📝 Create New Post</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Author Info (readonly) */}
                <div className="flex items-center gap-4">
                    <img
                        src={user?.photoURL}
                        alt="author"
                        className="w-14 h-14 rounded-full object-cover border"
                    />
                    <div>
                        <p className="text-lg font-semibold">{user?.displayName}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                </div>

                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        placeholder="Enter post title"
                        className="input input-bordered w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Write post description..."
                        rows={5}
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">Description is required</p>}
                </div>

                {/* Tags */}
                <div>
                    <label className="block mb-1 font-medium">Tags</label>
                    <Controller
                        name="tags"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <CreatableSelect
                                {...field}
                                options={tagOptions}
                                isMulti
                                placeholder="Select or create tags..."
                            />
                        )}
                    />
                    {errors.tags && <p className="text-red-500 text-sm mt-1">Please select at least one tag</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    🚀 Publish Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;
