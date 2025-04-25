import { ReactNode } from "react";
import { Navigate } from "react-router";
import { isAuthenticated } from "../libs/isAuthenticated.ts";
import { Routes } from "./routes.ts";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  return isAuthenticated() ? children : <Navigate to={Routes.LOGIN} replace />;
}
