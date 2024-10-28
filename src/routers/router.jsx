import { createHashRouter } from "react-router-dom";
import { privatePages, publicPages } from "../pages";
import RequireAuth from "./utils/requireAuth";

const router = createHashRouter([
  {
    path: "/",
    element: publicPages.loginPage,
  },
  {
    path: "/forgot-password",
    element: publicPages.forgotPassword,
  },
  {
    path: "/register",
    element: publicPages.registerPage,
  },
  {
    path: "/register-opd",
    element: publicPages.registerPage,
  },
  {
    path: "/activation-account",
    element: publicPages.activationAccount,
  },
  {
    path: "/",
    element: <RequireAuth redirectPath={"/"} />,
    children: [
      {
        path: "/dashboard",
        element: privatePages.dashboard,
      },
      {
        path: "/profile",
        element: privatePages.profilepage,
      },
      {
        path: "/incident",
        element: privatePages.announcemnetpage,
      },
      {
        path: "/case",
        element: privatePages.casepage,
      },
      {
        path: "/device",
        element: privatePages.devicepage,
      },
      {
        path: "/opd-list",
        element: privatePages.opdpage,
      },
      {
        path: "/user-management",
        element: privatePages.userspage,
      },
    ],
  },
]);

export default router;
