import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayouts = () => {
    return (
        <div className="min-h-screen flex flex-col bg-base-100">
            {/* 🧭 Navbar at top */}
            <Navbar />

            {/* 📦 Page content */}
            <main className="flex-1 px-4 py-6">
                <Outlet />
            </main>

            {/* 🔻 Optional Footer */}
            {/* <Footer /> */}
        </div>
    );
};

export default RootLayouts;
