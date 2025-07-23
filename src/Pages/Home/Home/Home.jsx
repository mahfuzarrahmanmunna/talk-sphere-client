import React, { useState } from 'react';
import Banner from '../Banner/Banner';
import AllPosts from '../AllPosts/AllPosts';
import ShowTags from '../ShowTags/ShowTags';
import WhyChooseUs from '../WhyChoseUs/WhyChoseUs';
import TagsMarquee from '../TagsMarquee/TagsMarquee';
import CoreFeatures from '../CoreFeatures/CoreFeatures';

const Home = () => {
    const [queryTag, setQueryTag] = useState(null);

    return (
        <div>
            <Banner queryTag={queryTag} setQueryTag={setQueryTag} />
            <TagsMarquee setQueryTag={setQueryTag} />

            <AllPosts />
            <WhyChooseUs />
            <CoreFeatures />
        </div>
    );
};

export default Home;
