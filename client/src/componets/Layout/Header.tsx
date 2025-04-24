import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">GitHub Projects</h1>
      </div>

      <div className="navbar-end">
        <a className="btn">Logout</a>
      </div>
    </header>
  );
};
