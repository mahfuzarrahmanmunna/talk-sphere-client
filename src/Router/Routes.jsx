import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AddPost from "../Pages/AddPost/AddPost";
import Login from "../Pages/Authentication/Login/Login";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayouts />, // Main layout (with navbar/footer)
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "add-post",
                element: (
                    // Add PrivateRoute wrapper later if needed
                    <AddPost />
                )
            }
        ]
    },
    {
        path: "/login",
        element: <Login /> // This page has no navbar/footer
    },
    {
        // path: "/register",
        // element: <Register /> // This page has no navbar/footer
    }
]);
