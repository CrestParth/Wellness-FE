import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import "./App.css";
import { AuthGuard, LogGuard } from "./common/Gaurd";
import StudioInformation from "./pages/studio/StudioInformation";
import ListOfVibeChecks from './pages/vibeChecks/ListOfVibeChecks'
import AddInstructor from "./components/instructor/AddInstructor";
import InstructorInfo from './pages/instructor/InstructorInfo'
import ListOfCategory from "./pages/category/ListOfCategory";
import ListOfSubscription from "./pages/subscription/ListOfSubscription";
import VibeInfo from "./pages/vibeChecks/VibeInfo";
import AddStudio from "./components/studio/AddStudio";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";
import AccountDeletion from "./pages/AccountDeletion";
import Verification from "./pages/auth/Verification";
import ApproveInstructor from "./pages/ApproveInstructor";

// Lazy imports (code-splitting)
const Layout = lazy(() => import("./common/Layout"));
const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import("./pages/Home"));
const UserInformation = lazy(() => import('./pages/user/UserInformation'))
const ListOfUser = lazy(() => import('./pages/user/ListOfUser'))
const ListOfStudio = lazy(() => import('./pages/studio/ListOfStudio'))
const ListOfInstructor = lazy(() => import('./pages/instructor/ListOfInstructor'))
const ListOfBoosted = lazy(() => import('./pages/boosted/ListOfBoosted'))

const Profile = lazy(() => import("./pages/Profile"));


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LogGuard>
          <Login />
        </LogGuard>
      ),
    },
    {
      path: "/verification",
      element: (
        <LogGuard>
          <Verification />
        </LogGuard>
      ),
    },
    {
      path: "/home",
      element: (
        <AuthGuard>
          <Layout />
        </AuthGuard>
      ),
      children: [
        { path: "", element: <Home /> },
        {
          path: "users",
          children: [
            { path: "", element: <ListOfUser /> },
            { path: "user-view/:id", element: <UserInformation /> },
          ],
        },
        {
          path: "studio",
          children: [
            { path: "", element: <ListOfStudio /> },
            { path: "add-studio", element: <AddStudio /> },
            { path: "studio-view/:id", element: <StudioInformation /> },
          ],
        },
        {
          path: "instructors",
          children: [
            { path: "", element: <ListOfInstructor /> },
            { path: "instructor-view/:id", element: <InstructorInfo /> },
            { path: "add-instructor", element: <AddInstructor /> },
          ],
        },
        {
          path: "approveInstructor",
          children: [
            { path: "", element: <ApproveInstructor /> },
          ],
        },
        {
          path: "boosted",
          children: [
            { path: "", element: <ListOfBoosted /> },
            { path: "boosted-view/:id", element: <InstructorInfo /> },
          ],
        },
        {
          path: "vibe",
          children: [{
            path: "",
            element: <ListOfVibeChecks />
          }, {
            path: "vibe-view/:id", element: <VibeInfo />
          }]
        },
        { path: "subscriptions", element: <ListOfSubscription /> },
        { path: "categories", element: <ListOfCategory /> },
        { path: "profile", element: <Profile /> },
      ],
    },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/terms-condition", element: <TermsCondition /> },
    { path: "/account-deletion", element: <AccountDeletion /> },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
