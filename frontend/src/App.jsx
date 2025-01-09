import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PenarikanKomisi from "./pages/PenarikanKomisi";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <PenarikanKomisi />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
