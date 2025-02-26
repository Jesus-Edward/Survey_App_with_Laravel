import { createBrowserRouter, Navigate } from "react-router-dom";
import Surveys from "./views/Surveys";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import SurveyViews from "./views/SurveyViews";
import SurveyPublicViews from "./views/SurveyPublicViews";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Navigate to="/" />,
            },
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/surveys",
                element: <Surveys />,
            },
            {
                path: "/surveys/create",
                element: <SurveyViews />,
            },
            {
                path: "/surveys/:id",
                element: <SurveyViews />,
            },
        ],
    },

    {
        path: "/guest",
        element: <GuestLayout />,
        children: [
            {
                path: "/guest/login",
                element: <Login />,
            },
            {
                path: "/guest/signup",
                element: <Signup />,
            },
        ],
    },

    {
        path: "/surveys/public/:slug",
        element: <SurveyPublicViews />,
    },
]);

export default router;
