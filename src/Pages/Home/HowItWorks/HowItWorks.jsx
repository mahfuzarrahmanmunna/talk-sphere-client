import React from "react";
import { FaSignInAlt, FaUsers, FaCommentDots, FaRocket } from "react-icons/fa";

const steps = [
    {
        icon: <FaSignInAlt className="text-blue-500 w-12 h-12 mb-4" />,
        title: "Sign Up",
        description: "Create your account quickly and securely to start your journey.",
    },
    {
        icon: <FaUsers className="text-green-500 w-12 h-12 mb-4" />,
        title: "Connect",
        description: "Find and connect with like-minded people easily.",
    },
    {
        icon: <FaCommentDots className="text-purple-500 w-12 h-12 mb-4" />,
        title: "Engage",
        description: "Join discussions, share ideas, and collaborate effortlessly.",
    },
    {
        icon: <FaRocket className="text-red-500 w-12 h-12 mb-4" />,
        title: "Grow",
        description: "Boost your skills, network, and productivity on the platform.",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-20 bg-gray-50 ">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12">
                    How TalkSphere Works
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-xl p-8 hover:scale-105 transform transition duration-300"
                        >
                            {step.icon}
                            <h3 className="text-xl font-semibold mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
