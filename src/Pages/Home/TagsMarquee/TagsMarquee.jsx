import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaHashtag } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const TagsCardSection = ({ setQueryTag }) => {
    const axiosSecure = useAxiosSecure();
    const { data: tags = [], isLoading } = useQuery({
        queryKey: ['allTags'],
        queryFn: async () => {
            const res = await axiosSecure.get('tags');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center py-10">Loading tags...</p>;

    return (
        <section className="w-full px-4 py-10 bg-base-100">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">🔥 Explore Tags</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {tags.map((tag, i) => (
                        <div
                            key={i}
                            onClick={() => setQueryTag(tag.name)}
                            className="cursor-pointer bg-base-200 hover:bg-primary hover:text-white transition-all duration-200 rounded-xl shadow-md p-4 flex items-center gap-3"
                        >
                            <FaHashtag className="text-lg shrink-0" />
                            <div className="text-sm font-medium">#{tag.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TagsCardSection;
