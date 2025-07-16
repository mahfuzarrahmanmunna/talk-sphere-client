import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useForm } from 'react-hook-form';
// import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const AddPost = ({ user }) => {
    const navigate = useNavigate();
    const [userPostCount, setUserPostCount] = useState(0);
    const [tagOptions, setTagOptions] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();

    // ✅ Get total posts of the user
    useEffect(() => {
        axios.get(`https://3000.com/posts/count?email=${user.email}`)
            .then(res => setUserPostCount(res.data.count));
    }, [user.email]);

    // ✅ Get available tags
    useEffect(() => {
        axios.get('https://3000.com/tags')
            .then(res => {
                const options = res.data.map(tag => ({
                    label: tag.name,
                    value: tag.name
                }));
                setTagOptions(options);
            });
    }, []);

    // ✅ On Submit
    const onSubmit = async (data) => {
        const newPost = {
            authorName: user.name,
            authorEmail: user.email,
            authorImage: user.photoURL,
            title: data.title,
            description: data.description,
            tags: data.tags.map(tag => tag.value),
            upVote: 0,
            downVote: 0,
            createdAt: new Date()
        };

        await axios.post('https://your-server.com/posts', newPost);
        reset();
        navigate('/dashboard/my-posts');
    };

    if (userPostCount >= 5 && !user.isMember) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Post Limit Reached</h2>
                <p className="mb-6">You can only add 5 posts as a free member.</p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/membership')}
                >
                    Become a Member
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-primary">Add New Post</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Title */}
                <input
                    {...register('title', { required: true })}
                    type="text"
                    placeholder="Post Title"
                    className="input input-bordered w-full"
                />
                {errors.title && <span className="text-red-500">Title is required</span>}

                {/* Description */}
                <textarea
                    {...register('description', { required: true })}
                    rows="5"
                    placeholder="Post Description"
                    className="textarea textarea-bordered w-full"
                />
                {errors.description && <span className="text-red-500">Description is required</span>}

                {/* Tags (React Select) */}
                <div>
                    <Select
                        options={tagOptions}
                        isMulti
                        onChange={(val) => setValue('tags', val)}
                        placeholder="Select tags..."
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    Submit Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;
