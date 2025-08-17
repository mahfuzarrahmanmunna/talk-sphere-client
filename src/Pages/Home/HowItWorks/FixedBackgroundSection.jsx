import React from "react";

const FixedBackgroundSection = () => {
    return (
        <section
            className="relative w-full h-screen bg-fixed bg-center bg-cover flex items-center justify-center text-white"
            style={{
                backgroundImage:
                    "url('https://i.ibb.co.com/Jjkqdv2x/2016-08-02-9267-1470132061-large.jpg')",
            }}
        >
            {/* Gradient & Blur Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-sm z-0"></div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl px-6 md:px-10 text-center space-y-8">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                    Welcome to <span className="text-blue-400">TalkSphere</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                    Where ideas ignite, voices connect, and global conversations come to life. Join a world of thinkers, doers, and dreamers.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold text-white shadow-md">
                        Get Started
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 transition px-6 py-3 rounded-lg font-semibold text-white shadow-md">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FixedBackgroundSection;
