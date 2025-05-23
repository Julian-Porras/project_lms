import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/appLayout";
import LoginPage from "../pages/auth/login-page";
import adminRouter from "./adminRouter";
import instructorRouter from "./instructorRouter";
import studentRouter from "./studentRouter";
import MainLayout from "../layouts/mainLayout";
import AdminLoginPage from "../pages/auth/admin-login-page";
import ForgotPassPage from "../pages/auth/forgot-pass";
import RegisterPage from "../pages/auth/register-page";
import { developerRouter } from "./developerRouter";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <RegisterPage />,
      },
      {
        index: "forgot-paswword",
        element: <ForgotPassPage />,
      },
      {
        index: "login/admin",
        element: <AdminLoginPage />,
      },
      {
        path: "admin",
        element: <MainLayout />,
        children: adminRouter,
      },
      {
        path: "instructor",
        element: <MainLayout />,
        children: instructorRouter,
      },
      {
        path: "dev",
        element: <MainLayout />,
        children: developerRouter,
      },
      {
        path: "student",
        element: <MainLayout />,
        children: studentRouter,
      },
    ],
  },
]);

export default router;
