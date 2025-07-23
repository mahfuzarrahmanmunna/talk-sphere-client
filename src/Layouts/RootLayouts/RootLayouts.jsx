import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import FallBack from "../../Components/FallBack/FallBack";
import Footer from "../../Components/Footer/Footer";

const RootLayouts = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading state (you can replace this with actual async calls)
        const timer = setTimeout(() => {
            setIsLoading(false); // Set loading state to false after the simulated loading
        }, 500); // 2 seconds delay, change as per your needs

        return () => clearTimeout(timer); // Clean up timeout on unmount
    }, []);

    // Show FallBack component until loading is false
    if (isLoading) {
        return <FallBack />;
    }
    return (
        <div className="min-h-screen flex flex-col bg-base-100">
            {/* 🧭 Navbar at top */}
            <Navbar />

            {/* 📦 Page content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* 🔻 Optional Footer */}
            <Footer />
        </div>
    );
};

export default RootLayouts;
