import DashboardPage from "./private/DashboardPage";
import ProfilePage from "./private/ProfilePage";
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
  profilepage: <ProfilePage />
};
