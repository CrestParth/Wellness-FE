import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import "./App.css";
import { AuthGuard, LogGuard } from "./common/Gaurd";
import VendorInformation from "./pages/vendor/VendorInformation";
import Review from "./pages/review/Review";
import AddInstructor from "./pages/instructor/AddInstructor";
import InstructorInfo from './pages/instructor/InstructorInfo'
import ListOfCategory from "./pages/category/ListOfCategory";
import ListOfSubscription from "./pages/subscription/ListOfSubscription";
import VibeInfo from "./pages/review/VibeInfo";

// Lazy imports (code-splitting)
const Layout = lazy(() => import("./common/Layout"));
const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import("./pages/Home"));
const UserInformation = lazy(() => import('./pages/user/UserInformation'))
const ListOfUser = lazy(() => import('./pages/user/ListOfUser'))
const ListOfVendor = lazy(() => import('./pages/vendor/ListOfVendor'))
const ListOfInstructor = lazy(() => import('./pages/instructor/ListOfInstructor'))

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
      path: "/home",
      element: (
        // <AuthGuard>
        <Layout />
        // </AuthGuard>
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
          path: "vendors",
          children: [
            { path: "", element: <ListOfVendor /> },
            { path: "vendor-view/:id", element: <VendorInformation /> },
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
          path: "vibe",
          children: [{
            path: "",
            element: <Review />
          }, {
            path: "vibe-view/:id", element: <VibeInfo />
          }]
        },
        { path: "subscriptions", element: <ListOfSubscription /> },
        { path: "categories", element: <ListOfCategory /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
