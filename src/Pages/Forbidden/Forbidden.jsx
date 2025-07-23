import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Link } from 'react-router';
import animationData from '../../assets/forbidden_page.json';
import usePageTitle from '../../Hooks/usePageTitle';

const Forbidden = () => {
    usePageTitle();
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData,
        });

        return () => anim.destroy();
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
            <div className="max-w-3xl text-center">
                <div ref={containerRef} className="mx-auto w-full max-w-md h-96" />

                <h1 className="text-4xl md:text-5xl font-bold mt-4 text-red-500">404 - Access Denied</h1>
                <p className="text-lg md:text-xl text-gray-300 mt-3 mb-6">
                    You don't have permission to access this page. If you think this is a mistake, please contact the admin or try logging in again.
                </p>

                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition duration-300"
                >
                    Back to Home
                </Link>
            </div>
        </section>
    );
};

export default Forbidden;
