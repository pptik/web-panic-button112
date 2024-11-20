import { createHashRouter } from "react-router-dom";
import { privatePages, publicPages } from "../pages";
import RequireAuth from "./utils/requireAuth";
import { GetRole } from "../helpers/AuthHeaders";

const role = GetRole();

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
        element:
          role === "super_admin"
            ? privatePages.announcemnetpage
            : privatePages.opdannouncementpage,
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
      {
        path: "/case/case-detail/:guid",
        element: privatePages.detailPage,
      },
      {
        path: "/incident/case-detail/:guid",
        element: privatePages.detailPage,
      },
    ],
  },
]);

export default router;
