import React from 'react';
import Banner from '../Banner/Banner';
import TagsMarquee from '../TagsMarquee/TagsMarquee';
import { useLoaderData } from 'react-router';

const Home = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div>
            <Banner />
            <TagsMarquee />
        </div>
    );
};

export default Home;