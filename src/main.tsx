import "./index.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppLoading } from "@/components/app-loading.tsx";
import { ThemeProvider } from "@/components/context/theme-provider.tsx";
import { UserProvider } from "@/components/context/usercontext.tsx";
import { Toaster } from "@/components/toaster.tsx";
import { router } from "@/config/routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <RouterProvider router={router} fallbackElement={<AppLoading />} />
        <Toaster position="top-right" richColors duration={1500} />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
