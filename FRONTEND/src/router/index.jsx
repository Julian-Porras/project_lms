import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/appLayout";
import adminRouter from "./adminRouter";
import instructorRouter from "./instructorRouter";
import studentRouter from "./studentRouter";
import MainLayout from "../layouts/mainLayout";
import { developerRouter } from "./developerRouter";
import { ROLES } from "../constants/role";
import ProtectedRoute from "../components/ProtectedRoute";

const AdminLoginPage = lazy(() => import("../pages/auth/admin-login-page"));
const LoginPage = lazy(() => import("../pages/auth/login-page"));
const RegisterPage = lazy(() => import("../pages/auth/register-page"));
const ForgotPassPage = lazy(() => import("../pages/auth/forgot-pass"));

const LazyWrapper = (Component) => (
  <Suspense fallback={null}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: LazyWrapper(LoginPage) },
      { path: "signup", element: LazyWrapper(RegisterPage) },
      { path: "forgot-password", element: LazyWrapper(ForgotPassPage) },
      { path: "login/admin", element: LazyWrapper(AdminLoginPage) },
      {
        path: "admin",
        element: ( <ProtectedRoute role={ROLES.ADMIN}><MainLayout /> </ProtectedRoute>),
        children: adminRouter,
      },
      {
        path: "dev",
        element: ( <ProtectedRoute role={ROLES.DEVELOPER || ROLES.ADMIN}><MainLayout /> </ProtectedRoute>),
        children: developerRouter,
      },
      {
        path: "instructor",
        element: ( <ProtectedRoute role={ROLES.INSTRUCTOR || ROLES.ADMIN}><MainLayout /> </ProtectedRoute>),
        children: instructorRouter,
      },
      {
        path: "student",
        element: ( <ProtectedRoute role={ROLES.STUDENT || ROLES.ADMIN}><MainLayout /> </ProtectedRoute>),
        children: studentRouter,
      },
    ],
  },
]);

export default router;
