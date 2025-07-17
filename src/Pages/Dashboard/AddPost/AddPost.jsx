import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddPost = () => {
    const navigate = useNavigate();
    const [userPostCount, setUserPostCount] = useState(0);
    const [tagOptions, setTagOptions] = useState([]);
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm();

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
        axios.get('http://localhost:3000/tags')
            .then(res => {
                const options = res.data.map(tag => ({
                    label: tag.name,
                    value: tag.name
                }));
                setTagOptions(options);
            })
            .catch(err => console.error("Tag fetch error:", err));
    }, []);

    // ✅ Submit form handler
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
            // Post the new post
            await axiosSecure.post('posts', newPost);
            reset();

            // Save new tags to DB if not already present
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

    // 🧱 Restrict free users to 5 posts
    if (userPostCount >= 5 && !user?.isMember) {
        return (
            <div className="p-6 text-center bg-base-100 shadow rounded-lg max-w-xl mx-auto mt-10">
                <h2 className="text-2xl font-bold mb-4 text-error">Post Limit Reached</h2>
                <p className="mb-6 text-gray-600">You can only add 5 posts as a free member.</p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/membership')}
                >
                    Become a Member
                </button>
            </div>
        );
    }

    if (loading) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-md rounded-lg mt-10">
            <h2 className="text-3xl font-bold mb-6 text-primary">📝 Add New Post</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Author Info (readonly) */}
                <div className="flex items-center gap-4">
                    <img
                        src={user?.photoURL}
                        alt="author"
                        className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                        <p className="text-lg font-semibold">{user?.displayName}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                </div>

                {/* Title */}
                <div>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        placeholder="Enter post title"
                        className="input input-bordered w-full"
                    />
                    {errors.title && <p className="text-red-500 mt-1">Title is required</p>}
                </div>

                {/* Description */}
                <div>
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Write post description..."
                        rows={6}
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.description && <p className="text-red-500 mt-1">Description is required</p>}
                </div>

                {/* Tags (select + create new) */}
                <div>
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
                                className="react-select-container"
                            />
                        )}
                    />
                    {errors.tags && <p className="text-red-500 mt-1">Please select at least one tag</p>}
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-full">
                    Submit Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;
