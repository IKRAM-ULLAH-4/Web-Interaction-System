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

import AdminLogin from "./AdminDashBoard/AdminLogin";
import AdminMenu from "./Pages/AdminMenu";

import PaymentSuccessPage from "./Pages/PaymentSuccesPage";
import PaymentCancel from "./Pages/PaymentCancelPage";

import AdminProtected from "./AdminDashBoard/AdminProtected";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  { path: "/", element: <LandingPage /> },
  { path: "/register", element: <RegistrationPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/homepage", element: <ChatApp /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/user/settings", element: <SettingsPage /> },

  // Admin Login (public)
  { path: "/admin", element: <AdminLogin /> },

  // ADMIN PROTECTED ROUTES
  {
    path: "/admin-menu",
    element: (
      <AdminProtected>
        <AdminMenu />
      </AdminProtected>
    ),
  },
  {
    path: "/admin-steps",
    element: (
      <AdminProtected>
        <AdminSteps />
      </AdminProtected>
    ),
  },
  {
    path: "/adminActivities",
    element: (
      <AdminProtected>
        <AdminDashboard />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <AdminProtected>
        <Users />
      </AdminProtected>
    ),
  },
  {
    path: "/admin-user-management",
    element: (
      <AdminProtected>
        <UserManagement />
      </AdminProtected>
    ),
  },
  {
    path: "/admin-channel",
    element: (
      <AdminProtected>
        <ChannelManagement />
      </AdminProtected>
    ),
  },
  {
    path: "/admin-moderation",
    element: (
      <AdminProtected>
        <ModerationForm />
      </AdminProtected>
    ),
  },
  {
    path: "/admin-setting",
    element: (
      <AdminProtected>
        <SystemSettingForm />
      </AdminProtected>
    ),
  },

  // PAYMENTS (PUBLIC)
  { path: "/premium-success", element: <PaymentSuccessPage /> },
  { path: "/premium-cancel", element: <PaymentCancel /> },
]);

export default router;
