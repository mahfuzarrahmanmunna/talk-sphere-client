import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import PostCard from '../PostCard/PostCard';
// import PostCard from '../../PostCard/PostCard';

const Banner = ({ queryTag, setQueryTag }) => {
    const [searchTag, setSearchTag] = useState('');
    const axiosSecure = useAxiosSecure();

    // Fetch posts by tag
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['searchPosts', queryTag],
        enabled: !!queryTag,
        queryFn: async () => {
            const res = await axiosSecure.get(`/tags/search?tag=${queryTag}`);
            return res.data;
        },
    });

    // Fetch top 5 tags
    const { data: tags = [] } = useQuery({
        queryKey: ['topTags'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tags');
            return res.data.slice(0, 5); // Limit to top 5
        }
    });

    // Handle search input
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTag.trim()) {
            setQueryTag(searchTag.trim().toLowerCase());
        }
    };

    const handleTagClick = (tag) => {
        setQueryTag(tag.toLowerCase());
        setSearchTag(tag.toLowerCase());
    };

    // Static banners
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
            {/* Banner Slider */}
            <div className="relative h-[600px] w-full overflow-hidden">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop
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

                                    {/* Search Form */}
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

                                    {/* Clickable Tags */}
                                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                        {tags.map((tag, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleTagClick(tag.name)}
                                                className="bg-white/80 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200"
                                            >
                                                #{tag.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Tag Search Results */}
            {queryTag && (
                <div className="bg-white px-4 py-12">
                    <h2 className="text-xl font-semibold text-center mb-6">
                        Results for tag: <span className="text-blue-600">#{queryTag}</span>
                    </h2>

                    {isLoading ? (
                        <p className="text-center text-lg">Loading posts...</p>
                    ) : posts.length > 0 ? (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {posts.map((post, index) => (
                                <PostCard key={post._id} post={post} index={index} />
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