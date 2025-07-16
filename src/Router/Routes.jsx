import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AddPost from "../Pages/AddPost/AddPost";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import DashboardLayouts from "../Layouts/DashboardLayouts/DashboardLayouts";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayouts />, // Main layout (with navbar/footer)
        children: [
            {
                path: '/',
                element: <Home />
            },

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
            }
        ]
    }
]);
