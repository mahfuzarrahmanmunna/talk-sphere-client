import { useForm } from "react-hook-form";
import { Link } from "react-router"; // ✅ use 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import TalkSphereLogo from "../../../Components/TalkSphereLogo/TalkSphereLogo";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        console.log("Login data:", data);
        setTimeout(() => setLoading(false), 1500); // simulate loading
    };

    const handleGoogleLogin = () => {
        console.log("Login with Google");
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative px-4"
            style={{
                backgroundImage: `url('https://i.ibb.co/21mNM9qc/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product.jpg')`,
            }}
        >
            {/* 🔗 Logo at Top-Left Like Navbar */}
            <Link to="/" className="absolute top-4 left-6 z-50">
                <TalkSphereLogo />
            </Link>

            <div className="bg-white/80 shadow-lg backdrop-blur-sm rounded-xl max-w-6xl w-full flex flex-col md:flex-row overflow-hidden mt-20">
                {/* 📝 Left Intro Text */}
                <div className="md:w-1/2 p-10 flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-3xl font-bold text-primary mb-4">Welcome Back to Talk Sphere!</h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                        Connect with the community, share your voice, and discover trending discussions. Sign in to stay engaged and informed.
                    </p>
                </div>

                {/* 🔐 Login Form */}
                <div className="md:w-1/2 p-8 bg-base-100">
                    <h3 className="text-2xl font-bold text-center mb-6">🔐 Login to Your Account</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label"><span className="label-text">Email</span></label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="label"><span className="label-text">Password</span></label>
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="divider">OR</div>

                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full flex items-center justify-center gap-2"
                    >
                        <FcGoogle className="text-xl" /> Continue with Google
                    </button>

                    <p className="mt-4 text-center">
                        New to Talk Sphere?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
