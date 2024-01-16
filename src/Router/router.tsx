import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { ErrorBoundary } from "pages/errorpage";

const StudentsPage = lazy(() => import("../pages/students"));

export const AppRouting = () => {
  return <RouterProvider router={router} />;
};

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <StudentsPage />,
      errorElement: <ErrorBoundary />,
    },
  ]
);
