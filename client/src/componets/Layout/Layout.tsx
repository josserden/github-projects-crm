import { FC, PropsWithChildren } from "react";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
