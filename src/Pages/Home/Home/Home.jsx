import React, { useState } from "react";
import Banner from "../Banner/Banner";
import TagsMarquee from "../TagsMarquee/TagsMarquee";
import WhyChooseUs from "../WhyChoseUs/WhyChoseUs";
import CoreFeatures from "../CoreFeatures/CoreFeatures";
import HowItWorks from "../HowItWorks/HowItWorks";
import FixedBackgroundSection from "../HowItWorks/FixedBackgroundSection";
import MarqueeTestimonials from "../MarqueeTestimonials/MarqueeTestimonials";
import CommunityStats from "../HowItWorks/CommunityStats";
import usePageTitle from "../../../Hooks/usePageTitle";
import AllPosts from "../AllPosts/AllPosts";

const Home = () => {
    usePageTitle();
    const [queryTag, setQueryTag] = useState(null);

    return (
        <div className="font-sans">
            {/* Hero Section */}
            <Banner queryTag={queryTag} setQueryTag={setQueryTag} />

            {/* Trending Tags */}
            <TagsMarquee setQueryTag={setQueryTag} />
            <AllPosts />

            {/* Value Proposition */}
            <WhyChooseUs />

            {/* Core Features */}
            <CoreFeatures />

            {/* How It Works */}
            <HowItWorks />

            {/* Fixed Background Section */}
            <FixedBackgroundSection />

            {/* User Testimonials */}
            <MarqueeTestimonials />

            {/* Community Stats */}
            <CommunityStats />

            {/* Optional Call to Action */}
            {/* <CallToAction /> */}
        </div>
    );
};

export default Home;
