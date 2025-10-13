import { createBrowserRouter } from "react-router-dom";
import RegistrationPage from "./Pages/RegistrationPage";
import ChatApp from "./Pages/ChatApp";
import ProfilePage from "./Pages/ProfilePage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SettingsPage from "./Pages/SettingPage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/register", element: <RegistrationPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/homepage", element: <ChatApp /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "settings", element: <SettingsPage /> },
]);

export default router;
