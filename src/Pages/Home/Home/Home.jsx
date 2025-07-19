import React, { useState } from 'react';
import Banner from '../Banner/Banner';
import AllPosts from '../AllPosts/AllPosts';
import ShowTags from '../ShowTags/ShowTags';

const Home = () => {
    const [queryTag, setQueryTag] = useState(null);

    return (
        <div>
            <Banner queryTag={queryTag} setQueryTag={setQueryTag} />
            <AllPosts />
        </div>
    );
};

export default Home;
