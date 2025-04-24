import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-1">
      <p>Copyright © {new Date().getFullYear()} </p>
    </footer>
  );
};
