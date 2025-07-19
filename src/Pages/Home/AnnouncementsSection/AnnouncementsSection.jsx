import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AnnouncementsSection = () => {
    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/announcements');
            return res.data;
        }
    });

    if (announcements.length === 0) return null;

    return (
        <section className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">📢 Announcements</h2>
            <div className="space-y-4">
                {announcements.map((item) => (
                    <div key={item._id} className="p-4 border rounded bg-white shadow">
                        <div className="flex items-center gap-3 mb-2">
                            <img src={item.authorImage} alt="author" className="w-10 h-10 rounded-full object-cover border" />
                            <p className="font-semibold">{item.authorName}</p>
                        </div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-gray-700">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AnnouncementsSection;
