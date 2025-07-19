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
                path: 'announcements',
                element: (
                    <MakeAnnouncement />
                )
            },
            {
                path: '/membership',
                element: (
                    <MembershipPage />
                )
            },
            {
                path: 'post/:id',
                element: (
                    <PostDetails />
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
        element: <DashboardLayouts />,
        children: [
            {
                path: "add-post",
                element: (
                    <AddPost />
                )
            },
            {
                path: 'my-profile',
                element: (
                    <MyProfile />
                )
            },
            {
                path: 'my-posts',
                element: (
                    <MyPosts />
                )
            },
        ]
    }
]);
