import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Banner = () => {
    const [searchTag, setSearchTag] = useState('');
    const [queryTag, setQueryTag] = useState(null);

    // Fetch posts by tag
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['searchPosts', queryTag],
        enabled: !!queryTag,
        queryFn: async () => {
            const res = await axios.get(
                `https://your-server.com/posts/search?tag=${queryTag}`
            );
            return res.data;
        },
    });

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTag.trim()) {
            setQueryTag(searchTag.trim().toLowerCase());
        }
    };

    // Banner slides
    const banners = [
        {
            img: 'https://i.ibb.co/99dp2YFw/pexels-jibarofoto-2774556.jpg',
            title: 'Discover Amazing Content',
            subtitle: 'Search by tags to find what interests you'
        },
        {
            img: 'https://i.ibb.co/Mxd7DxWv/pexels-werner-pfennig-6950018.jpg',
            title: 'Explore Trending Topics',
            subtitle: 'Find the most popular posts today'
        },
        {
            img: 'https://i.ibb.co/xqPWghXN/pexels-orkhan-shahbaz-370085423-18751164.jpg',
            title: 'Join the Community',
            subtitle: 'Connect with like-minded people'
        }
    ];

    return (
        <div className="relative w-full">
            {/* Hero Slider */}
            <div className="relative h-[600px] w-full overflow-hidden">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    effect="fade"
                    className="w-full h-full"
                >
                    {banners.map((banner, i) => (
                        <SwiperSlide key={i}>
                            <div className="relative w-full h-full">
                                <img
                                    src={banner.img}
                                    alt={`banner-${i}`}
                                    className="w-full h-full object-cover brightness-[.4]"
                                />
                                <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-white text-center">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{banner.title}</h1>
                                    <p className="text-xl mb-8 drop-shadow-lg">{banner.subtitle}</p>

                                    {/* Search Bar */}
                                    <form onSubmit={handleSubmit} className="max-w-xl w-full flex gap-4">
                                        <input
                                            type="text"
                                            placeholder="Enter tag (e.g., react, node)"
                                            className="input input-bordered w-full bg-white/90 text-gray-800"
                                            value={searchTag}
                                            onChange={(e) => setSearchTag(e.target.value)}
                                        />
                                        <button type="submit" className="btn btn-primary whitespace-nowrap">
                                            Search
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Search Results */}
            {queryTag && (
                <div className="bg-white px-4 py-12">
                    {isLoading ? (
                        <p className="text-center text-lg">Loading posts...</p>
                    ) : posts.length > 0 ? (
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map(post => (
                                <div key={post._id} className="card bg-base-100 shadow-md p-4 border">
                                    <div className="flex items-center gap-3 mb-2">
                                        <img src={post.authorImage} alt="author" className="w-10 h-10 rounded-full" />
                                        <span className="font-semibold">{post.authorName}</span>
                                    </div>
                                    <h2 className="text-lg font-bold">{post.title}</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(post.createdAt).toLocaleString()}
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="badge badge-outline">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-4">
                            No posts found for tag: <strong>{queryTag}</strong>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Banner;
