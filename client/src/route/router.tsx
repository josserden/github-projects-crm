import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "../componets/reusable/Layout";
import { isAuthenticated } from "../libs/isAuthenticated.ts";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { Routes } from "./routes.ts";
import { LoginPage } from "../pages/LoginPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { RegisterPage } from "../pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: (
      <Navigate
        to={isAuthenticated() ? Routes.PROJECTS : Routes.LOGIN}
        replace
      />
    ),
  },
  {
    path: Routes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: Routes.REGISTER,
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
        path: Routes.PROJECTS,
        element: <ProjectsPage />,
      },
    ],
  },
]);
