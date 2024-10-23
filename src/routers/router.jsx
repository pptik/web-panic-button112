import { createBrowserRouter } from "react-router-dom";
import { publicPages } from "../pages";
// import RequireAuth from "./utils/requireAuth";

const router = createBrowserRouter([
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
    path: "/activation-account",
    element: publicPages.activationAccount,
  },
  // {
  //   path: "/",
  //   element: <RequireAuth redirectPath={"/"} />,
  //   children: [
  //     {
  //       path: "/dashboard",
  //       element: pages.dashboard,
  //     },
  //     {
  //       path: "/pengguna",
  //       element: pages.userPage,
  //     },
  //     {
  //       path: "/perangkat",
  //       element: pages.devicePage,
  //     },
  //     {
  //       path: "/atur-jadwal",
  //       element: pages.schedulePage,
  //     },
  //     {
  //       path: "/kartu-rfid",
  //       element: pages.rfidPage,
  //     },
  //     {
  //       path: "/profil",
  //       element: pages.profilPage,
  //     },
  //     {
  //       path: "/tambah-kartu",
  //       element: pages.addRfid,
  //     },
  //     {
  //       path: "/tambah-detail-kartu",
  //       element: pages.addDetailRfid,
  //     },
  //     {
  //       path: "/unit",
  //       element: pages.unitPage,
  //     },
  //     {
  //       path: "/jadwal-lembur",
  //       element: pages.lemburPage,
  //     },
  //     {
  //       path: "/detail-lembur",
  //       element: pages.detailLembur,
  //     },
  //   ],
  // },
]);

export default router;
