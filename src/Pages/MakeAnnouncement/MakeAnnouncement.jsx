import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MakeAnnouncement = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [uploading, setUploading] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const onSubmit = async (data) => {
        setSuccessMsg("");
        setErrorMsg("");

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("image", data.authorImage[0]);

            const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=f2f3f75de26957d089ecdb402788644c`, formData);
            const imageUrl = imgRes.data.data.url;

            const announcement = {
                authorName: data.authorName,
                authorImage: imageUrl,
                title: data.title,
                description: data.description
            };

            const res = await axiosSecure.post("announcements", announcement);
            if (res.status === 201) {
                setSuccessMsg("✅ Announcement posted successfully!");
                reset();
            }
        } catch (error) {
            console.error("Failed to post announcement:", error);
            setErrorMsg("❌ Failed to post announcement. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 z-0" data-aos="fade-up">
            <h1 className="text-4xl font-bold text-center text-primary mb-8" data-aos="fade-down">
                📢 Make an Announcement
            </h1>

            {successMsg && <p className="text-green-600 text-center mb-4">{successMsg}</p>}
            {errorMsg && <p className="text-red-600 text-center mb-4">{errorMsg}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg space-y-4" data-aos="zoom-in">
                <div>
                    <label className="block font-semibold mb-1">Author Name</label>
                    <input
                        type="text"
                        {...register("authorName", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.authorName && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Author Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("authorImage", { required: true })}
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.authorImage && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.title && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        rows="4"
                        {...register("description", { required: true })}
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                    {errors.description && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary px-6" disabled={uploading}>
                        {uploading ? "Uploading..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MakeAnnouncement;
