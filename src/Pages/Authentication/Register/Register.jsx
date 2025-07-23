import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import TalkSphereLogo from "../../../Components/TalkSphereLogo/TalkSphereLogo";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const { createUser, updateUser, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {
        setLoading(true);
        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            // Upload image
            setImageUploading(true);
            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=f2f3f75de26957d089ecdb402788644c`,
                formData
            );
            const imageUrl = imgRes.data.data.url;

            // Create user
            await createUser(data.email, data.password);

            // Update Firebase profile
            await updateUser({
                displayName: data.name,
                photoURL: imageUrl,
            });

            // Update local context
            setUser((prevUser) => ({
                ...prevUser,
                displayName: data.name,
                photoURL: imageUrl,
            }));

            // Save to DB
            const savedUser = {
                name: data.name,
                email: data.email,
                image: imageUrl,
                badge: "Bronze",
                role: "user",
                isMember: false,
            };
            await axiosSecure.post("users", savedUser);

            // Success message
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Account created successfully!",
                showConfirmButton: false,
                timer: 1500,
            });

            navigate(location.state?.from || "/");

        } catch (err) {
            console.error("Registration error:", err);
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: err.message,
            });
        } finally {
            setImageUploading(false);
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4 py-8"
            style={{
                backgroundImage: `url('https://i.ibb.co/21mNM9qc/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product.jpg')`,
            }}
        >
            <div className="absolute top-4 left-4 z-10">
                <Link to="/">
                    <TalkSphereLogo />
                </Link>
            </div>

            <div className="w-full max-w-6xl mx-auto bg-white/80 shadow-xl rounded-xl backdrop-blur-sm overflow-hidden flex flex-col md:flex-row">
                {/* Left Form */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 bg-base-100">
                    <h3 className="text-2xl font-bold text-center mb-6">📝 Register to Talk Sphere</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered w-full" />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" {...register("email", { required: "Email is required" })} className="input input-bordered w-full" />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="label"><span className="label-text">Image</span></label>
                            <input type="file" accept="image/*" {...register("image", { required: "Image is required" })} className="file-input file-input-bordered w-full" />
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                        </div>

                        <div>
                            <label className="label"><span className="label-text">Password</span></label>
                            <input
                                type={showPass ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
                                className="input input-bordered w-full"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="label"><span className="label-text">Confirm Password</span></label>
                            <input
                                type={showPass ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === watch("password") || "Passwords do not match",
                                })}
                                className="input input-bordered w-full"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="btn btn-xs btn-outline mt-2"
                            >
                                {showPass ? "🙈 Hide Password" : "👁️ Show Password"}
                            </button>
                        </div>

                        <button className="btn btn-primary w-full mt-4" type="submit" disabled={loading || imageUploading}>
                            {loading || imageUploading ? "Submitting..." : "Register"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </div>

                {/* Right Info */}
                <div className="md:w-1/2 p-10 flex flex-col justify-center text-center md:text-left">
                    <div className="mb-6">
                        <TalkSphereLogo />
                    </div>
                    <h2 className="text-3xl font-bold text-primary mb-4">Join the Talk Sphere Community!</h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                        Share your thoughts, explore new ideas, and connect with people around the world. Let's talk, together.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
