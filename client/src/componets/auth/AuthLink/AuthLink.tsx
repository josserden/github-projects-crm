import { FC } from "react";
import { Link } from "react-router";
import { Routes } from "../../../route/routes.ts";

type Props = {
  to: Routes;
  label: string;
  title: string;
};

export const AuthLink: FC<Props> = ({ to, label, title }) => {
  return (
    <div className="mt-4 text-center">
      {title}{" "}
      <Link to={to} className="link link-primary">
        {label}
      </Link>
    </div>
  );
};
