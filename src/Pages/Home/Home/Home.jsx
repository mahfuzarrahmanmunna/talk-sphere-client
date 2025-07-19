import React, { useState } from 'react';
import Banner from '../Banner/Banner';
import AllPosts from '../AllPosts/AllPosts';
import ShowTags from '../ShowTags/ShowTags';

const Home = () => {
    const [queryTag, setQueryTag] = useState(null);

    return (
        <div>
            <Banner queryTag={queryTag} setQueryTag={setQueryTag} />
            <div className="my-10 px-4 max-w-6xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
                <ShowTags setQueryTag={setQueryTag} />
            </div>
            <AllPosts />
        </div>
    );
};

export default Home;
