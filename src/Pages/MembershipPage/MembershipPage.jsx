import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MembershipPage = () => {
    const { user } = useAuth();
    const [isPaying, setIsPaying] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async () => {
        setIsPaying(true);
        try {
            // Simulate successful payment (replace with real payment logic if needed)

            // Update user in your backend
            const updatedUser = {
                isMember: true,
                badge: "Gold",
            };

            await axios.patch(`http://localhost:3000/users/${user.email}`, updatedUser); // 🔁 Use your real API route

            Swal.fire({
                icon: "success",
                title: "Payment Successful!",
                text: "You are now a Gold Member 🎉",
                timer: 2000,
                showConfirmButton: false,
            });

            navigate("/dashboard");
        } catch (err) {
            console.error("Payment Error:", err);
            Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: "Payment failed. Please try again later.",
            });
        } finally {
            setIsPaying(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-primary">Become a Gold Member</h2>
                <p className="mb-6 text-gray-600">
                    Unlock the full power of Talk Sphere. For just <span className="font-semibold">৳99 / $1</span>, you can post unlimited content and earn a Gold badge!
                </p>

                <button
                    className="btn btn-primary w-full"
                    onClick={handlePayment}
                    disabled={isPaying}
                >
                    {isPaying ? "Processing..." : "Pay ৳99 / $1 to Become a Member"}
                </button>
            </div>
        </div>
    );
};

export default MembershipPage;
