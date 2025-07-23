import React from 'react';

const CoreFeatures = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Our Core Features</h2>
                <p className="text-lg mb-12">
                    Designed with real-world functionality, flexibility, and scalability in mind — here’s what makes our platform powerful.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
                    {/* Feature 1 */}
                    <div className=" rounded-xl p-6 shadow hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3">Role-Based Access Control</h3>
                        <p className="text-gray-600">
                            Admins, users, and moderators see only what they need — making the system secure and efficient.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className=" rounded-xl p-6 shadow hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3">Dynamic Dashboard</h3>
                        <p className="text-gray-600">
                            Personalized dashboard for each user with real-time updates and statistics based on their activity.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className=" rounded-xl p-6 shadow hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3">Email Verification & JWT Auth</h3>
                        <p className="text-gray-600">
                            Secure login with Firebase Auth, email verification, and JWT for protected backend API access.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className=" rounded-xl p-6 shadow hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3">Live Notifications</h3>
                        <p className="text-gray-600">
                            Real-time alerts and status updates keep users informed and engaged on every key action.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className=" rounded-xl p-6 shadow hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3">Fully Responsive UI</h3>
                        <p className="text-gray-600">
                            Optimized for all screen sizes — mobile, tablet, or desktop — ensuring consistent user experience.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className=" rounded-xl p-6 shadow hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3">Developer Friendly</h3>
                        <p className="text-gray-600">
                            Clean, modular codebase with reusable components makes it easy to maintain, scale, and contribute.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoreFeatures;
