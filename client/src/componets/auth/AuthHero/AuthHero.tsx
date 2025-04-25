import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  title: string;
  description: string;
};

export const AuthHero: FC<Props> = ({ children, title, description }) => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left px-10">
          <h1 className="text-5xl font-bold text-balance">{title}</h1>
          <p className="py-6 text-balance">{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
};
