import { createBrowserRouter } from "react-router-dom";
import ForgetPassword from "../Pages/ForgetPassword";
import VerifyOTP from "../Pages/VerifyOTP";
import ResetPassword from "../Pages/ResetPassword";
import Doctor from "../Pages/Doctor";
import Tasks from "../Components/Tasks";
import AiFilterLayout from "../Pages/AiFilterLayout";
import ProjectsManagedTeams from "../Pages/ProjectsManagedTeams";
import ProjectDetails from "../Pages/ProjectDetails";
import JoinRequests from "../Pages/JoinRequests";
import StudentDashboard from "../Pages/studentDashboard";
import NotificationsPage from "../Pages/Notifications";
import ProjectTypes from "../Pages/projectType";
import UploadProjectIdea from "../Pages/UploadProjectIdea";
import Login from "../Pages/auth/Login";
// import EditStudentProfile from "../Pages/EditStudentProfile";
import ProtectedRoute from "../Components/ProtectedRoute";
// import EditProfile from "../Pages/EditProfile";
import DoctorDashboard from "../Pages/DoctorDashboard";
import Milestones from "../Pages/Milestones";
import TeamProjectRules from "../Pages/TeamProjectRules";
import StudentsManagement from "../Pages/Management";
import AIFilterPage_admin from "../Pages/aifilter-admin";
import MilestonesSetup from "../Pages/Milestonessetup";
import SuggestionsProjectsPage from "../Pages/SuggestionsprojectsPage";
import TeamsSection from "./../Pages/Teamspage";
import FinalDiscussionsSection from "../Pages/Finaldiscussionssection";
import EditProfile from "../Pages/EditStudentProfile";
export const router = createBrowserRouter([
  { path: "/logingit ", element: <Login /> },
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
      {
        path: "projects",
        element: <ProjectsManagedTeams />,
      },
      {
        path: "project-details",
        element: <ProjectDetails />,
      },
      {
        path: "join-requests",
        element: <JoinRequests />,
      },
    ],
  },

  // 👇 دول برا root route
  {
    path: "student-dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "notifications",
    element: <NotificationsPage />,
  },
  {
    path: "project-types",
    element: <ProjectTypes />,
  },
  {
    path: "Upload-Project-Idea",
    element: <UploadProjectIdea />,
  },
    {
    path: "/profile",
    element: <EditProfile />,
  },
]);