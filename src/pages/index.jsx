import AnnouncementPage from "./private/AnnouncementPage";
import CasePage from "./private/CasePage";
import DashboardPage from "./private/DashboardPage";
import { DetailCasePage } from "./private/DetailCasePage";
import DevicePage from "./private/DevicePage";
import OPDAnnouncementPage from "./private/OPDAnnouncementPage";
import OPDPage from "./private/OPDPage";
import ProfilePage from "./private/ProfilePage";
import UsersPage from "./private/UsersPage";
import ActivationAccountPage from "./public/ActivationAccountPage";
import ForgotPasswordPage from "./public/ForgotPasswordPage";
import LoginPage from "./public/LoginPage";
import RegisterPage from "./public/RegisterPage";

export const publicPages = {
  loginPage: <LoginPage />,
  registerPage: <RegisterPage />,
  forgotPassword: <ForgotPasswordPage />,
  activationAccount: <ActivationAccountPage />,
};

export const privatePages = {
  dashboard: <DashboardPage />,
  profilepage: <ProfilePage />,
  casepage: <CasePage />,
  devicepage: <DevicePage />,
  userspage: <UsersPage />,
  opdpage: <OPDPage />,
  announcemnetpage: <AnnouncementPage />,
  opdannouncementpage: <OPDAnnouncementPage />,
  detailPage: <DetailCasePage />,
};
