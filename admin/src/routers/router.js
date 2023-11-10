import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

export const router = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element:
            <AuthLayout>
                <Dashboard />
            </AuthLayout>,
    },
]