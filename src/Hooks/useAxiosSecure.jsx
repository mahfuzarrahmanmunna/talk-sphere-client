import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    // baseURL: "https://talk-sphere-server.vercel.app/",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { user, loading, logOutUser } = useAuth();

    useEffect(() => {
        if (!loading && user?.accessToken) {
            const requestInterceptor = axiosInstance.interceptors.request.use(
                (config) => {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                    return config;
                },
                (error) => Promise.reject(error)
            );

            const responseInterceptor = axiosInstance.interceptors.response.use(
                (res) => res,
                (err) => {
                    if (err?.response?.status === 401 || err?.response?.status === 403) {
                        logOutUser().then(() => {
                            console.log("🔒 Token expired. Logging out.");
                        });
                    }
                    return Promise.reject(err);
                }
            );

            return () => {
                axiosInstance.interceptors.request.eject(requestInterceptor);
                axiosInstance.interceptors.response.eject(responseInterceptor);
            };
        }
    }, [user, loading]);

    return axiosInstance;
};

export default useAxiosSecure;
