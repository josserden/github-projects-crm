import { ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./componets/Layout";
import { LoginPage } from "./pages/LoginPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { RegisterPage } from "./pages/RegisterPage";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function ProtectedRoute({ children }: { children: ReactNode }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Navigate to={isAuthenticated() ? "/projects" : "/login"} replace />
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      // {
      //   path: "/projects/new",
      //   element: <AddProjectPage />,
      // },
    ],
  },
]);
