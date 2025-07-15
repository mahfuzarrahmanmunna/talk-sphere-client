import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayouts />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
])