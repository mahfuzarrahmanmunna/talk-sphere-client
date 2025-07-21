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
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayouts />, // Main layout (with navbar/footer)
        children: [
            {
                path: '/',
                element: <Home />,
                loader: () => fetch(`http://localhost:3000/tags`)
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
                    <PostDetails />
                )
            },
            {
                path: 'comments/:postId',
                element: (
                    <PrivateRoutes>
                        <CommentReportPage />
                    </PrivateRoutes>
                )
            }
        ]
    },
    {
        path: "/login",
        element: <Login /> // This page has no navbar/footer
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
        ]
    }
]);
