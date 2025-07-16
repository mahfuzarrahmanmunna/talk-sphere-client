import React from 'react';
import Marquee from 'react-fast-marquee';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const TagsMarquee = ({ setQueryTag }) => {
    const { data: tags = [], isLoading } = useQuery({
        queryKey: ['allTags'],
        queryFn: async () => {
            const res = await axios.get('https://your-server.com/tags');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center py-10">Loading tags...</p>;

    // Split tags into two halves
    const mid = Math.ceil(tags.length / 2);
    const firstHalf = tags.slice(0, mid);
    const secondHalf = tags.slice(mid);

    return (
        <div className="w-full bg-base-100 py-8 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">🔥 Explore by Tags</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column marquee */}
                <Marquee speed={40} gradient={false} pauseOnHover direction="left">
                    <div className="flex gap-6">
                        {firstHalf.map((tag, i) => (
                            <span
                                key={i}
                                onClick={() => setQueryTag(tag.name)}
                                className="badge badge-outline badge-lg hover:bg-primary hover:text-white cursor-pointer transition-all duration-200"
                            >
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                </Marquee>

                {/* Right column marquee */}
                <Marquee speed={40} gradient={false} pauseOnHover direction="right">
                    <div className="flex gap-6">
                        {secondHalf.map((tag, i) => (
                            <span
                                key={i}
                                onClick={() => setQueryTag(tag.name)}
                                className="badge badge-outline badge-lg hover:bg-primary hover:text-white cursor-pointer transition-all duration-200"
                            >
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default TagsMarquee;
