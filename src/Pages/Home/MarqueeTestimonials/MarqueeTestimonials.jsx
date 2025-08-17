import React from "react";

// Testimonial data with avatars
const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "UI/UX Designer",
        message:
            "TalkSphere is amazing! The user experience is smooth and engaging. I love the design and all the interactive features!",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 2,
        name: "James Smith",
        role: "Software Engineer",
        message:
            "Connecting with like-minded people on TalkSphere is super easy! The community is vibrant and full of talented users.",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Content Creator",
        message:
            "The platform is intuitive, fun, and user-friendly. TalkSphere has truly revolutionized how I share content.",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        id: 4,
        name: "Michael Brown",
        role: "Product Manager",
        message:
            "TalkSphere makes collaboration effortless. Features are thoughtfully designed and very easy to use.",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
        id: 5,
        name: "Sophia Wilson",
        role: "Digital Marketer",
        message:
            "I love the responsiveness and professional look of TalkSphere. The experience is seamless across devices!",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
];

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 m-4 inline-block w-96 flex-shrink-0 text-center hover:scale-105 transform transition duration-300">
            <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-700 dark:text-gray-300 italic mb-4 break-words">
                "{testimonial.message}"
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {testimonial.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
        </div>
    );
};

const MarqueeTestimonials = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    What Our Users Say
                </h2>
                <div className="overflow-hidden">
                    <div className="flex animate-marquee gap-6">
                        {testimonials.map((t) => (
                            <TestimonialCard key={t.id} testimonial={t} />
                        ))}
                        {/* Duplicate for infinite scrolling */}
                        {testimonials.map((t) => (
                            <TestimonialCard key={`dup-${t.id}`} testimonial={t} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarqueeTestimonials;
