import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WebRouterProvider from "./RouterProvider/WebRouterProvider";
import { ToastContainer } from "react-toastify";
import UserContext from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <WebRouterProvider></WebRouterProvider>

        <ToastContainer></ToastContainer>
      </UserContext>
    </QueryClientProvider>
  </StrictMode>
);
