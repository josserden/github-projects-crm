import { FC } from "react";
import { useNavigate } from "react-router";

import { logout } from "@/api/auth.ts";
import { Routes } from "@/route/routes.ts";

export const Header: FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(Routes.LOGIN, { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">GitHub Projects</h1>
      </div>

      <div className="navbar-end">
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};
