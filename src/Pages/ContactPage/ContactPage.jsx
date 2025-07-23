import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import usePageTitle from '../../Hooks/usePageTitle';

const ContactPage = () => {
    usePageTitle();
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-24">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800">Contact Me</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Have questions, feedback, or want to collaborate? I’d love to hear from you. This page provides everything you need to reach out or learn more about this project.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Info Panel */}
                <div className="lg:w-1/2 space-y-8">
                    {/* Project Overview */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">About This Project</h2>
                        <p className="text-gray-700">
                            This project is a full-stack blogging platform built using the MERN stack (MongoDB, Express, React, Node.js) with advanced features like pagination, search, sorting, category filtering, and dynamic routing.
                            It's designed to be scalable and developer-friendly, perfect for tech blogs or knowledge-sharing platforms.
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Tech Stack</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Frontend: React.js, Tailwind CSS, DaisyUI, Axios</li>
                            <li>Backend: Node.js, Express.js, MongoDB</li>
                            <li>Authentication: Firebase Auth (optional)</li>
                            <li>Deployment: Vercel (Frontend), Render or Railway (Backend)</li>
                        </ul>
                    </div>

                    {/* Personal Info */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Info</h2>
                        <div className="flex flex-col gap-3 text-gray-700 text-sm">
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-blue-600" />
                                <span>mdmahfuzarrahmanmunna44@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaGithub className="text-gray-800" />
                                <a
                                    href="https://github.com/mahfuzarrahmanmunna"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    github.com/mahfuzarrahmanmunna
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaLinkedin className="text-blue-700" />
                                <a
                                    href="https://www.linkedin.com/in/md-mahfuzar-rahman-munna-41a342351/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    linkedin.com/in/mahfuzarrahmanmunna
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-red-500" />
                                <span>Rangpur, Bangladesh (Remote)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaClock className="text-purple-600" />
                                <span>Available: Mon - Fri, 10:00 AM – 7:00 PM (GMT+6)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:w-1/2 bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Send Me a Message</h2>
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <input
                            type="text"
                            placeholder="Subject"
                            className="input input-bordered w-full mt-6"
                        />
                        <textarea
                            placeholder="Your Message"
                            className="textarea textarea-bordered w-full mt-6"
                            rows="5"
                            required
                        ></textarea>
                        <button type="submit" className="btn btn-primary w-full mt-6">
                            Send Message
                        </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-3">*You’ll receive a response within 24-48 hours.</p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
