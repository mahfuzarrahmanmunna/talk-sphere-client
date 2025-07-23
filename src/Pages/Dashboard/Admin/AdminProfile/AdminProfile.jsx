import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LineElement, PointElement, LinearScale } from "chart.js";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import usePageTitle from "../../../../Hooks/usePageTitle";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LineElement, PointElement, LinearScale);

const AdminProfile = () => {
    usePageTitle();
    const axiosSecure = useAxiosSecure();
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const { user } = useAuth();

    // Fetch admin stats (posts, comments, users)
    const { data: stats, isLoading, error } = useQuery({
        queryKey: ["adminStats"], // queryKey should be an array
        queryFn: async () => {
            const response = await axiosSecure.get("/admin/stats");
            return response.data; // this is the result returned from the API
        }
    });
    console.log(stats);

    // Fetch existing tags
    const fetchTags = async () => {
        try {
            const response = await axiosSecure.get("/tags");
            setTags(response.data);
        } catch (err) {
            console.error("Error fetching tags", err);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    // Handle tag submission
    const handleTagSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosSecure.post("/admin/tags", { tag });
            setTag(""); // Reset the input field
            fetchTags(); // Refresh the tags list
        } catch (err) {
            console.error("Error adding tag", err);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching stats</div>;

    const { totalPosts, totalComments, totalUsers } = stats;

    // Pie chart data
    const pieData = {
        labels: ["Posts", "Comments", "Users"],
        datasets: [
            {
                data: [totalPosts, totalComments, totalUsers],
                backgroundColor: ["#ff9999", "#66b3ff", "#99ff99"],
                hoverOffset: 4,
            },
        ],
    };

    // Line chart data
    const lineData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Posts Over Time",
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: "#42a5f5",
                tension: 0.1,
                pointRadius: 5,
                pointBackgroundColor: "#42a5f5",
                pointBorderColor: "#fff",
            },
            {
                label: "Comments Over Time",
                data: [28, 48, 40, 19, 86, 27],
                fill: false,
                borderColor: "#ff7043",
                tension: 0.1,
                pointRadius: 5,
                pointBackgroundColor: "#ff7043",
                pointBorderColor: "#fff",
            },
        ],
    };

    return (
        <div className=" min-h-screen">
            <h2 className="text-4xl font-bold text-primary mb-8 text-center">
                Welcome, {user?.displayName} 👋
            </h2>

            {/* Admin Profile Information */}
            <div className="flex flex-col items-center mb-8 p-6 bg-white rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105">
                <img
                    src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                    alt="Admin"
                    className="w-24 h-24 rounded-full mb-4 border-4 border-primary"
                />
                <h3 className="text-3xl font-semibold text-primary">{user?.displayName}</h3>
                <p className="text-xl text-gray-600">{user?.email}</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="stat-card">
                    <h4 className="text-lg font-semibold text-gray-700">Total Posts</h4>
                    <p className="text-2xl font-bold text-blue-600">{totalPosts}</p>
                </div>
                <div className="stat-card">
                    <h4 className="text-lg font-semibold text-gray-700">Total Comments</h4>
                    <p className="text-2xl font-bold text-green-600">{totalComments}</p>
                </div>
                <div className="stat-card">
                    <h4 className="text-lg font-semibold text-gray-700">Total Users</h4>
                    <p className="text-2xl font-bold text-purple-600">{totalUsers}</p>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-xl animate__animated animate__fadeIn animate__delay-1s">
                <h4 className="text-2xl font-semibold mb-4">Website Stats Overview</h4>
                <Pie data={pieData} />
            </div>

            {/* Line Chart */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-xl animate__animated animate__fadeIn animate__delay-2s">
                <h4 className="text-2xl font-semibold mb-4">Posts and Comments Over Time</h4>
                <Line data={lineData} />
            </div>

            {/* Add Tag Form */}
            <div className="bg-white p-6 rounded-lg shadow-xl mb-8">
                <h4 className="text-xl font-semibold mb-4">Add New Tag</h4>
                <form onSubmit={handleTagSubmit} className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Enter new tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="input input-bordered w-80"
                    />
                    <button type="submit" className="btn btn-primary">
                        Add Tag
                    </button>
                </form>
            </div>

            {/* Display Tags */}
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h4 className="text-xl font-semibold mb-4">Existing Tags</h4>
                <ul className="list-disc pl-6 text-gray-700">
                    {tags.map((tag, index) => (
                        <li key={index} className="text-lg">{tag.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminProfile;
