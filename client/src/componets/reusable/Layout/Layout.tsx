import { FC, PropsWithChildren } from "react";

import { Footer } from "@/componets/reusable/Layout/Footer.tsx";
import { Header } from "@/componets/reusable/Layout/Header.tsx";
import { Outlet } from "react-router";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />

        {children}
      </main>
      <Footer />
    </div>
  );
};
