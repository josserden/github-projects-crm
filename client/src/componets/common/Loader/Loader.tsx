import { FC } from "react";

export const Loader: FC = () => {
  return (
    <div className="flex justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
};
