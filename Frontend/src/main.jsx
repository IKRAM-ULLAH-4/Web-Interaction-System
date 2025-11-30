import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import router from "./Paths.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
