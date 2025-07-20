import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; // Ensure using 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import TalkSphereLogo from "../../../Components/TalkSphereLogo/TalkSphereLogo";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loading, login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();  // Axios hook to make secure API requests

    const onSubmit = async (data) => {
        try {
            const user = await login(data.email, data.password);
            if (user) {
                // Check if user needs role or badge update
                const userData = {
                    email: data.email,
                    role: "user",
                    badge: "Bronze",
                    isMember: false,
                    updatedAt: new Date(),
                };

                // Send the updated data to backend (only if needed)
                await axiosSecure.patch('/users', userData);

                Swal.fire("Success!", "Logged in successfully!", "success");
                navigate("/");
            }
        } catch (error) {
            Swal.fire("Oops!", error.message || "Login failed", "error");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            // Step 1: Log in the user with Google
            const result = await loginWithGoogle();

            // Step 2: Check if the login was successful
            if (result.user) {
                const { email, displayName, photoURL } = result.user;

                // Step 3: Define the user's role and badge
                const userRole = "user"; // Default role for normal users
                const userBadge = "Bronze"; // Default badge for new users

                // Step 4: Send the user data to the backend
                await axiosSecure.post('/users', {
                    email,
                    displayName,
                    photoURL,
                    role: userRole,
                    badge: userBadge,
                    isMember: false // Setting initial member status to false
                });

                // Step 5: Show success message and navigate
                Swal.fire("Welcome!", "Logged in with Google!", "success");
                navigate("/");
            }
        } catch (error) {
            Swal.fire("Oops!", error.message || "Google login failed", "error");
        }
    };

    return (
        <div
            className="min-h-screen w-full py-12 flex items-center justify-center bg-cover bg-center relative px-4"
            style={{
                backgroundImage: `url('https://i.ibb.co/21mNM9qc/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product.jpg')`,
            }}
        >
            <Link to="/" className="absolute top-4 left-6 z-50">
                <TalkSphereLogo />
            </Link>

            <div className="bg-white/80 shadow-lg backdrop-blur-sm rounded-xl max-w-6xl w-full flex flex-col md:flex-row overflow-hidden mt-20">
                <div className="md:w-1/2 p-10 flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-3xl font-bold text-primary mb-4">Welcome Back to Talk Sphere!</h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                        Connect with the community, share your voice, and discover trending discussions. Sign in to stay engaged and informed.
                    </p>
                </div>

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
                        New to Talk Sphere? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
