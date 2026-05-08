import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/ForgetPassword";
import VerifyOTP from "../Pages/VerifyOTP";
import ResetPassword from "../Pages/ResetPassword";
import Doctor from "../Pages/Doctor";
import Tasks from "../Components/Tasks";
import AiFilterLayout from "../Pages/AiFilterLayout";
import ProtectedRoute from "../Components/ProtectedRoute";
import EditProfile from "../Pages/EditProfile";
import DoctorDashboard from "../Pages/DoctorDashboard";
import Milestones from "../Pages/Milestones";
import TeamProjectRules from "../Pages/TeamProjectRules";
import StudentsManagement from "../Pages/Management";
import AIFilterPage_admin from "../Pages/aifilter-admin";
import MilestonesSetup from "../Pages/Milestonessetup";
import SuggestionsProjectsPage from "../Pages/SuggestionsprojectsPage";
import TeamsSection from "./../Pages/Teamspage";
import FinalDiscussionsSection from "../Pages/Finaldiscussionssection";
export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/verify-otp", element: <VerifyOTP /> },
  { path: "/reset-password", element: <ResetPassword /> },

  {
    path: "/edit-profile",
    element: (
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/doctor-dashboard",
    element: (
      <ProtectedRoute>
        <DoctorDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/milestones",
    element: (
      <ProtectedRoute>
        <Milestones />
      </ProtectedRoute>
    ),
  },
  {
    path: "/rules",
    element: (
      <ProtectedRoute>
        <TeamProjectRules />
      </ProtectedRoute>
    ),
  },
  {
    path: "/management",
    element: (
      <ProtectedRoute>
        <StudentsManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-ai-filter",
    element: (
      <ProtectedRoute>
        <AIFilterPage_admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-milestones",
    element: (
      <ProtectedRoute>
        <MilestonesSetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/suggestions-projects",
    element: (
      <ProtectedRoute>
        <SuggestionsProjectsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-teams",
    element: (
      <ProtectedRoute>
        <TeamsSection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/final-discussions",
    element: (
      <ProtectedRoute>
        <FinalDiscussionsSection/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/doctor",
    element: (
      <ProtectedRoute>
        <Doctor />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Tasks /> },

      {
        path: "ai-filter",
        element: <AiFilterLayout />,
        children: [
          { index: true, element: <div></div> },
          { path: "team", element: <div>Team Content</div> },
        ],
      },
    ],
  },
]);
