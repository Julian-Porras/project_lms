// router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/appLayout";
import LoginPage from "../pages/auth/login-page";
import adminRouter from "./adminRouter";
import instructorRouter from "./instructorRouter";
import studentRouter from "./studentRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      ...adminRouter,
      ...instructorRouter,
      ...studentRouter,
    ],
  },
]);

export default router;
