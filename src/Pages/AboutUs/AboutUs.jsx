// AboutUs.jsx
import React, { useMemo } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import usePageTitle from '../../Hooks/usePageTitle';

// Animated Background Component
const AnimatedBackground = () => {
    const emojis = ["💻", "⚡", "🛠️", "🌐", "📱", "📝", "🌟", "🌼", "🔥"];
    const shapes = [
        { size: 24, color: "bg-blue-300", shape: "rounded-full" },
        { size: 20, color: "bg-pink-300", shape: "rounded-lg" },
        { size: 28, color: "bg-green-300", shape: "rounded-full" },
    ];

    const emojiConfigs = useMemo(() =>
        emojis.map(emoji => ({
            emoji,
            left: Math.random() * 100,
            x: Math.random() * 1000,
            duration: 20 + Math.random() * 10,
            delay: Math.random() * 5,
        }))
        , []);

    const shapeConfigs = useMemo(() =>
        shapes.map(shape => ({
            ...shape,
            left: Math.random() * 100,
            duration: 25 + Math.random() * 10,
            delay: Math.random() * 5,
        }))
        , []);

    return (
        <div className="absolute inset-0 overflow-hidden z-0">
            {emojiConfigs.map((config, index) => (
                <motion.div
                    key={`emoji-${index}`}
                    initial={{ y: -60, x: config.x }}
                    animate={{ y: 1200 }}
                    transition={{
                        repeat: Infinity,
                        duration: config.duration,
                        ease: 'linear',
                        delay: config.delay,
                    }}
                    className="absolute text-3xl opacity-40"
                    style={{ left: `${config.left}%` }}
                >
                    {config.emoji}
                </motion.div>
            ))}
            {shapeConfigs.map((config, index) => (
                <motion.div
                    key={`shape-${index}`}
                    className={`absolute ${config.color} ${config.shape} opacity-20`}
                    style={{
                        width: `${config.size}px`,
                        height: `${config.size}px`,
                        left: `${config.left}%`,
                    }}
                    initial={{ y: -60, rotate: 0 }}
                    animate={{ y: 1200, rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: config.duration,
                        ease: 'linear',
                        delay: config.delay,
                    }}
                />
            ))}
        </div>
    );
};

const AboutUs = () => {
    usePageTitle('About Me');

    const skills = [
        "JavaScript (ES6+), TypeScript",
        "React.js, Next.js",
        "Node.js, Express.js",
        "MongoDB, Firebase, PostgreSQL",
        "HTML5, CSS3, Tailwind CSS",
        "Git, GitHub, Netlify, Vercel",
        "REST APIs, JWT, Firebase Auth",
        "Framer Motion, AOS, LottieFiles"
    ];

    return (
        <div className="relative bg-gradient-to-b from-white to-blue-50 text-gray-800">
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Social Sidebar */}
            <div className="hidden md:flex flex-col gap-6 fixed top-1/3 left-4 z-50">
                {[
                    {
                        name: 'GitHub',
                        icon: <FaGithub />,
                        href: 'https://github.com/mahfuzarrahmanmunna',
                        color: 'hover:text-black',
                    },
                    {
                        name: 'LinkedIn',
                        icon: <FaLinkedin />,
                        href: 'https://linkedin.com/in/mahfuzarrahmanmunna',
                        color: 'hover:text-blue-600',
                    },
                    {
                        name: 'Email',
                        icon: <FaEnvelope />,
                        href: 'mailto:mdmahfuzarrahmanmunna44@gmail.com',
                        color: 'hover:text-red-500',
                    },
                ].map((social, index) => (
                    <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative text-2xl text-gray-500 transition duration-300 ${social.color}`}
                    >
                        {social.icon}
                        <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ease-in-out whitespace-nowrap">
                            {social.name}
                        </span>
                    </a>
                ))}
            </div>

            {/* Main Content */}
            <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-20 space-y-20 relative z-10">
                {/* Header */}
                <section className="text-center">
                    <h1 className="text-5xl font-bold">About Me</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Dive into my world of coding, creativity, and collaboration.
                    </p>
                </section>

                {/* Intro & Skills */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-semibold">👋 Who I Am</h2>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                            I'm <strong>Md. Mahfuzar Rahman Munna</strong>, a MERN Stack Developer based in Bangladesh. I build scalable, user-centric applications using React, Node, and modern web tech.
                        </p>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                            I enjoy building course platforms, admin dashboards, and real-time forums. I'm a quick learner, collaborative team player, and passionate about impactful tech.
                        </p>
                    </section>

                    <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-semibold mb-6">🛠️ My Toolkit</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                            {skills.map((skill, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-green-500 text-lg">✔️</span>
                                    <span>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Project + Features */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-semibold mb-4">📖 Project: TalkSphere</h2>
                        <p className="text-gray-700 leading-relaxed">
                            A full-stack forum platform where users can create posts, vote, comment, and engage with developers. Built with scalability and modularity in mind.
                        </p>
                    </section>

                    <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-semibold mb-4">✨ Features</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>📝 Post creation & editing</li>
                            <li>💬 Nested comments & replies</li>
                            <li>👍 Voting system</li>
                            <li>🏷️ Tagging & categorization</li>
                            <li>🛡️ Admin moderation tools</li>
                            <li>🔐 Auth with Firebase JWT</li>
                            <li>📊 Post analytics</li>
                            <li>📱 Responsive design</li>
                        </ul>
                    </section>
                </div>

                {/* Tech Stack & Contact */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-semibold mb-4">💻 Stack & Architecture</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                            <li>🔹 React.js, Tailwind CSS</li>
                            <li>🔹 Node.js, Express.js</li>
                            <li>🔹 MongoDB, Firebase</li>
                            <li>🔹 JWT, Firebase Auth</li>
                            <li>🔹 REST APIs</li>
                            <li>🔹 Vercel, Heroku</li>
                        </ul>
                    </section>

                    <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-semibold mb-6">📬 Get in Touch</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" placeholder="Your Name" className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" required />
                                <input type="email" placeholder="Your Email" className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" required />
                            </div>
                            <textarea placeholder="Your Message" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" rows="5" required></textarea>
                            <button type="submit" className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                                Send Message
                            </button>
                        </form>
                    </section>
                </div>

                {/* Connect Section */}
                <section className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg text-center">
                    <h2 className="text-3xl font-semibold mb-6">📱 Connect With Me</h2>
                    <div className="flex justify-center gap-8 text-3xl text-gray-700">
                        <a href="https://github.com/mahfuzarrahmanmunna" target="_blank" rel="noopener noreferrer" className="hover:text-black transition duration-300"><FaGithub /></a>
                        <a href="https://linkedin.com/in/mahfuzarrahmanmunna" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition duration-300"><FaLinkedin /></a>
                        <a href="mailto:mdmahfuzarrahmanmunna44@gmail.com" className="hover:text-red-500 transition duration-300"><FaEnvelope /></a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
