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

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/register", element: <RegistrationPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/homepage", element: <ChatApp /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "settings", element: <SettingsPage /> },
  { path: "/users", element: <UserManagement /> },
  { path: "/channel", element: <ChannelManagement /> },
  { path: "/moderation", element: <ModerationForm /> },
  { path: "/setting", element: <SystemSettingForm /> },
  { path: "admin", element: <AdminDashboard /> },
]);

export default router;
