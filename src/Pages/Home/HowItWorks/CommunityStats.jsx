import React from "react";
import { useCountUp } from "react-countup";
import { motion } from "framer-motion";
import { Users, MessageSquare, Share2, Globe } from "lucide-react";

const stats = [
    { id: "activeUsers", label: "Active Users", end: 15000, suffix: "+", icon: <Users className="w-8 h-8 text-blue-500" /> },
    { id: "discussions", label: "Discussions", end: 8000, suffix: "+", icon: <MessageSquare className="w-8 h-8 text-purple-500" /> },
    { id: "postsShared", label: "Posts Shared", end: 25000, suffix: "+", icon: <Share2 className="w-8 h-8 text-pink-500" /> },
    { id: "countries", label: "Countries", end: 50, suffix: "", icon: <Globe className="w-8 h-8 text-green-500" /> },
];

const StatCard = ({ id, label, end, suffix, icon }) => {
    const { countUp } = useCountUp({
        ref: id,
        end,
        enableScrollSpy: true,
        scrollSpyDelay: 300,
        duration: 2.5,
        suffix,
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl 
                 hover:scale-105 transform transition-all duration-300 relative z-10"
        >
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-4xl font-extrabold text-white drop-shadow">
                <span id={id}>{countUp}</span>
            </h3>
            <p className="mt-2 text-lg text-gray-100">{label}</p>
        </motion.div>
    );
};

const floatingEmojis = [
    { emoji: "🌍", top: "10%", left: "15%" },
    { emoji: "💬", top: "30%", left: "80%" },
    { emoji: "🤝", top: "70%", left: "20%" },
    { emoji: "🚀", top: "50%", left: "90%" },
    { emoji: "🔥", top: "80%", left: "60%" },
    { emoji: "🌟", top: "40%", left: "50%" },
];

const CommunityStats = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden text-white">
            {/* Decorative floating shapes */}
            <div className="absolute inset-0">
                <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-20 left-20 animate-pulse"></div>
                <div className="absolute w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bottom-20 right-20 animate-ping"></div>
            </div>

            {/* Floating emojis / icons */}
            {floatingEmojis.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute text-4xl select-none"
                    style={{ top: item.top, left: item.left }}
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                >
                    {item.emoji}
                </motion.div>
            ))}

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-5xl font-extrabold mb-14 drop-shadow-lg"
                >
                    Our Global Community
                </motion.h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
                    {stats.map((stat) => (
                        <StatCard key={stat.id} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommunityStats;
