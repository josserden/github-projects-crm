import { FC, PropsWithChildren } from "react";

export const ErrorMessage: FC<PropsWithChildren> = ({ children }) => {
  return <p className="text-error text-center text-sm mt-2">{children}</p>;
};
