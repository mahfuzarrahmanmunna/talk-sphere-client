import React from "react";

const CallToAction = () => {
    return (
        <section className="py-20 bg-blue-600 text-white text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6">
                    Ready to Join TalkSphere?
                </h2>
                <p className="text-lg mb-8">
                    Connect, collaborate, and grow with our global community today.
                </p>
                <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition">
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default CallToAction;
