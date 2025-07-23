import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AddPost from "../Pages/Dashboard/AddPost/AddPost";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import DashboardLayouts from "../Layouts/DashboardLayouts/DashboardLayouts";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import MembershipPage from "../Pages/MembershipPage/MembershipPage";
import MyPosts from "../Pages/Dashboard/MyPosts/MyPosts";
import PostDetails from "../Pages/PostDetails/PostDetails";
import MakeAnnouncement from "../Pages/MakeAnnouncement/MakeAnnouncement";
import PrivateRoutes from "../Routes/Private/PrivateRoutes";
import CommentsPage from "../Pages/Dashboard/CommentsPage/CommentsPage";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import CommentReportPage from "../Pages/Dashboard/CommentReportPage/CommentReportPage";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AdminRoutes from "../Routes/Admin/AdminRoutes";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import ReportedActivitiesPage from "../Pages/Dashboard/Admin/ReportedActivitiesPage/ReportedActivitiesPage";
import FallBack from "../Components/FallBack/FallBack";
import AboutUs from "../Pages/AboutUs/AboutUs";
import BlogsPage from "../Pages/BlogsPage/BlogsPage";
import ContactPage from "../Pages/ContactPage/ContactPage";
import Forbidden from "../Pages/Forbidden/Forbidden";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayouts />, // Main layout (with navbar/footer)
        errorElement: <Forbidden />,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: () => fetch(`https://talk-sphere-server.vercel.app/tags`),
                hydrateFallbackElement: <FallBack />
            },

            {
                path: '/membership',
                element: (
                    <PrivateRoutes>
                        <MembershipPage />
                    </PrivateRoutes>
                )
            },
            {
                path: 'post/:id',
                element: (
                    <PrivateRoutes>
                        <PostDetails />
                    </PrivateRoutes>
                )
            },
            {
                path: 'about',
                element: (
                    <AboutUs />
                )
            },
            {
                path: 'blog',
                element: (
                    <BlogsPage />
                )
            },
            {
                path: 'contact',
                element: (
                    <ContactPage />
                )
            },

        ]
    },
    {
        path: "/login",
        element: <Login /> // This page has no navbar/footer
    },
    {
        path: 'forbidden',
        element: <Forbidden />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoutes>
                <DashboardLayouts />
            </PrivateRoutes>
        ),
        children: [
            {
                index: true,
                element: <PrivateRoutes>
                    <DashboardHome />
                </PrivateRoutes>
            },
            {
                path: "add-post",
                element: (
                    <PrivateRoutes>
                        <AddPost />
                    </PrivateRoutes>
                )
            },
            {
                path: 'my-profile',
                element: (
                    <PrivateRoutes>
                        <MyProfile />
                    </PrivateRoutes>
                )
            },
            {
                path: 'my-posts',
                element: (
                    <PrivateRoutes>
                        <MyPosts />
                    </PrivateRoutes>
                )
            },
            {
                path: 'comments/:postId',
                element: (
                    <PrivateRoutes>
                        <CommentReportPage />
                    </PrivateRoutes>
                )
            },
            {
                path: 'manage-users',
                element: (
                    <AdminRoutes>
                        <ManageUsers />
                    </AdminRoutes>
                )
            },
            {
                path: 'make-announcement',
                element: (
                    <AdminRoutes>
                        <MakeAnnouncement />
                    </AdminRoutes>
                )
            },
            {
                path: 'admin-profile',
                element: (
                    <AdminRoutes>
                        <AdminProfile />
                    </AdminRoutes>
                )
            },
            {
                path: 'reported-comments',
                element: (
                    <AdminRoutes>
                        <ReportedActivitiesPage />
                    </AdminRoutes>
                )
            },
        ]
    }
]);
