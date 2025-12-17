import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import "./App.css";
import { AuthGuard, LogGuard } from "./common/Gaurd";

// Lazy imports (code-splitting)
const Layout = lazy(() => import("./common/Layout"));
const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import("./pages/Home"));
const UserInformation = lazy(() => import('./pages/user/UserInformation'))
const ListOfUser = lazy(() => import('./pages/user/ListOfUser'))
const ListOfVendor = lazy(() => import('./pages/vendor/ListOfVendor'))

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
          ],
        },
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
