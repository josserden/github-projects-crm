import { router } from "./route/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider } from "react-router";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
