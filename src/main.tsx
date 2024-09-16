// Font imports
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
// Main app CSS
import "./index.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLoading } from "./components/app-loading.tsx";
import { NotFound } from "./components/not-found.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/toaster.tsx";
import { Files } from "./routes/files.tsx";
import { Home } from "./routes/home.tsx";
import { Lectures } from "./routes/lectures.tsx";
import { Login } from "./routes/login.tsx";
import { Root } from "./routes/root.tsx";
import { Youtube } from "./routes/youtube.tsx";
import { UserProvider } from "@/components/context/usercontext.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },  
  {
    path: "/lectures",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Lectures />,
      },
    ],
  },
  {
    path: "/files",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Files />,
      },
    ],
  },
  {
    path: "/youtube",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Youtube />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
        <RouterProvider router={router} fallbackElement={<AppLoading />} />
        <Toaster position="top-right" richColors duration={1500} />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
