import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useState } from "react";
import TalkSphereLogo from "../../../Components/TalkSphereLogo/TalkSphereLogo";

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        console.log("Registration Data:", data);
        setTimeout(() => setLoading(false), 1500);
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative px-4"
            style={{
                backgroundImage: `url('https://i.ibb.co/21mNM9qc/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product.jpg')`,
            }}
        >
            {/* 🔗 Logo top-left */}
            <Link to="/" className="absolute top-4 left-6 z-50">
                <TalkSphereLogo />
            </Link>

            <div className="bg-white/80 shadow-lg backdrop-blur-sm rounded-xl max-w-6xl w-full flex flex-col md:flex-row overflow-hidden mt-20">
                {/* 📋 Registration Form */}
                <div className="md:w-1/2 p-8 bg-base-100">
                    <h3 className="text-2xl font-bold text-center mb-6">📝 Create Your Account</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label"><span className="label-text">Name</span></label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                placeholder="Enter your name"
                                className="input input-bordered w-full"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

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
                            <label className="label"><span className="label-text">Image URL</span></label>
                            <input
                                type="url"
                                {...register("photo", { required: "Image URL is required" })}
                                placeholder="Enter image URL"
                                className="input input-bordered w-full"
                            />
                            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
                        </div>

                        <div>
                            <label className="label"><span className="label-text">Password</span></label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: "Password is required" })}
                                    placeholder="Enter password"
                                    className="input input-bordered w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2 text-sm text-blue-500"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="label"><span className="label-text">Confirm Password</span></label>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (val) => val === watch("password") || "Passwords do not match"
                                })}
                                placeholder="Confirm password"
                                className="input input-bordered w-full"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Register"}
                        </button>
                    </form>

                    <p className="mt-4 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </div>

                {/* ℹ️ Right Side Info */}
                <div className="md:w-1/2 p-10 flex flex-col justify-center text-center md:text-left">
                    <div className="mb-6">
                        <TalkSphereLogo />
                    </div>
                    <h2 className="text-3xl font-bold text-primary mb-4">Join Talk Sphere Today!</h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                        Create your account and start sharing your thoughts. Talk Sphere is your space to connect, post, comment, and grow your digital presence.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;