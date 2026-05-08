import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { ProfileProvider } from "./context/ProfileContext";
import { AcademicYearProvider } from "./context/Academicyearcontext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <AcademicYearProvider>
          <RouterProvider router={router} />
        </AcademicYearProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>,
);
