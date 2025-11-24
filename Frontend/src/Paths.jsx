import { createBrowserRouter } from "react-router-dom";
import RegistrationPage from "./Pages/RegistrationPage";
import ChatApp from "./Pages/ChatApp";
import ProfilePage from "./Pages/ProfilePage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SettingsPage from "./Pages/SettingPage";
import UserManagement from "./AdminDashBoard/UserManagement";
import ChannelManagement from "./AdminDashBoard/ChannelManagement";
import ModerationForm from "./AdminDashBoard/ModerationForm";
import SystemSettingForm from "./AdminDashBoard/SystemSettingForm";
import AdminDashboard from "./AdminDashBoard/AdminDashboard";
import AdminSteps from "./AdminDashBoard/AdminSteps";
import Users from "./AdminDashBoard/Users";
import AdminPage from "./Pages/AdminPage";
import PaymentSuccessPage from "./Pages/PaymentSuccesPage";
import PaymentCancel from "./Pages/PaymentCancelPage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/register", element: <RegistrationPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/homepage", element: <ChatApp /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/user/settings", element: <SettingsPage /> },
  { path: "/users", element: <UserManagement /> },
  { path: "/channel", element: <ChannelManagement /> },
  { path: "/moderation", element: <ModerationForm /> },
  { path: "/setting", element: <SystemSettingForm /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/adminActivities", element: <AdminDashboard /> },
  { path: "/admin/steps", element: <AdminSteps /> },
  { path: "/u", element: <Users /> },

  { path: "/premium-success", element: <PaymentSuccessPage /> },
  { path: "/premium-cancel", element: <PaymentCancel /> },
]);

export default router;
