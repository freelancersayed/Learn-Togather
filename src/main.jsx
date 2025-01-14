import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>

    <QueryClientProvider client={queryClient}>
      <div className="max-w-scree mx-auto">
        <RouterProvider router={router}></RouterProvider>
      </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
