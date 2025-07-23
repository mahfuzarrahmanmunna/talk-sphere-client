import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">About Me</h1>
                <p className="mt-4 text-lg text-gray-600">Get to know more about me, my journey, and how we can connect.</p>
            </div>

            {/* Introduction Section */}
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12">
                <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
                <p className="mt-4 text-gray-700">
                    Hi, I’m <strong>Md. Mahfuzar Rahman Munna</strong>, a MERN Stack Web Developer based in Bangladesh. I'm passionate about building scalable and user-friendly web applications with modern technologies like React.js, Next.js, and TypeScript.
                </p>
                <p className="mt-4 text-gray-700">
                    I have worked on various full-stack projects, including course platforms, admin dashboards, and real-time forums. My strength lies in writing clean, maintainable code and always striving to improve user experience.
                </p>
                <p className="mt-4 text-gray-700">
                    I am also a fast learner, a team player, and always open to feedback and collaboration.
                </p>
            </div>

            {/* Skills Section */}
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12">
                <h2 className="text-2xl font-semibold text-gray-800">Skills & Expertise</h2>
                <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        "JavaScript (ES6+), TypeScript",
                        "React.js, Next.js",
                        "Node.js, Express.js",
                        "MongoDB, Firebase, PostgreSQL",
                        "HTML5, CSS3, Tailwind CSS",
                        "Git, GitHub, Netlify, Vercel",
                        "REST APIs, JWT, Firebase Auth",
                        "Framer Motion, AOS, LottieFiles"
                    ].map((skill, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                            <span className="text-xl text-green-600">✔️</span>
                            <p className="text-gray-700">{skill}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Education & Certifications */}
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12">
                <h2 className="text-2xl font-semibold text-gray-800">Education & Certifications</h2>
                <ul className="mt-4 space-y-4">
                    <li>
                        🎓 <strong>Diploma in Computer Science</strong> - Rangpur Polytechnic Institute (Ongoing)
                    </li>
                    <li>
                        🏆 <strong>Web Development Bootcamp</strong> - Programming Hero (Mentor: Shakil Talukdar)
                    </li>
                </ul>
            </div>

            {/* Social Links */}
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect With Me</h2>
                <div className="flex justify-center gap-6 text-2xl text-gray-700">
                    <a href="https://github.com/mahfuzarrahmanmunna" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/mahfuzarrahmanmunna" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:mdmahfuzarrahmanmunna44@gmail.com" className="hover:text-red-600">
                        <FaEnvelope />
                    </a>
                </div>
            </div>

            {/* Contact Section */}
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800">Contact Me</h2>
                <p className="mt-4 text-gray-700">
                    If you’d like to connect or have any questions, feel free to reach out. I’m open to freelance work, collaborations, and job opportunities.
                </p>

                <form className="mt-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <textarea
                            placeholder="Your Message"
                            className="textarea textarea-bordered w-full"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary mt-6 w-full">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default AboutUs;
