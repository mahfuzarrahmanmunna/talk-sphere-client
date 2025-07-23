import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ShowTags = ({ setQueryTag, limit = 5 }) => {
    const [tags, setTags] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('tags')
            .then(res => res.json())
            .then(data => {
                const sorted = data.slice(0, limit); // Limit to first 5
                setTags(sorted);
            })
            .catch(err => console.error('Failed to load tags:', err));
    }, [limit]);

    return (
        <div className="flex gap-2 flex-wrap justify-center mt-6">
            {tags.map(tag => (
                <span
                    key={tag._id || tag.name}
                    onClick={() => setQueryTag(tag.name || tag)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm cursor-pointer transition"
                >
                    #{tag.name || tag}
                </span>
            ))}
        </div>
    );
};

export default ShowTags;
