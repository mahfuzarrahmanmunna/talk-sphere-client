import React from 'react';

const WhyChooseUs = () => {
    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Our Platform</h2>
                <p className="text-lg text-gray-600 mb-12">
                    We’re not just building a platform — we’re solving real problems with modern technology, performance, and reliability at the core.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Card 1 */}
                    <div className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Modern Tech Stack</h3>
                        <p className="text-gray-600">
                            Built with React, Express, MongoDB, and Firebase Auth for seamless and secure user experience.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">User-Friendly Interface</h3>
                        <p className="text-gray-600">
                            Clean, responsive, and intuitive design that ensures a smooth experience for all users.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Real-World Features</h3>
                        <p className="text-gray-600">
                            From authentication to role-based dashboards, every feature serves a real-world need.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Scalable & Secure</h3>
                        <p className="text-gray-600">
                            Secure data flow with JWT, protected routes, and scalable architecture for future growth.
                        </p>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast Performance</h3>
                        <p className="text-gray-600">
                            Optimized front-end and efficient API calls ensure blazing fast performance and responsiveness.
                        </p>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Dedicated Support</h3>
                        <p className="text-gray-600">
                            Transparent development, continuous improvement, and a helpful team always ready to support.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
