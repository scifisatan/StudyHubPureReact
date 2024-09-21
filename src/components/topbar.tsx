import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { PrivateRoute } from "@/routes/private";

function    Component() {
  {
    if ((import.meta.env.VITE_CHATWOOT_ENABLED || "false") === "true") {
      useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://chat.sthaarun.com.np/packs/js/sdk.js";
        script.defer = true;
        script.async = true;
        script.onload = () => {
          //@ts-ignore
          window.chatwootSettings = {
            position: "left", // Change to "left" or "right"
            type: "standard",
            launcherTitle: "Chat with us",
          };
          //@ts-ignore
          window.chatwootSDK.run({
            websiteToken: "spW4kHDxsV6M9AMbEY4WzUF8",
            baseUrl: "https://chat.sthaarun.com.np",
          });
        };
        document.body.appendChild(script);

        // Cleanup script when the component unmounts
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    }
  }

  return (
    <>
      <div className="w-col flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 bg-transparent backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-end gap-4 px-4 py-4">
            <ModeToggle />
            <UserAvatar
              user={{
                id: "1",
                name: "Abi Shrestha",
                email: "39abii@gmail.com",
                avatar:
                  "https://gravatar.com/avatar/58afca37391e56b6c99cbc82c955676b?s=200&d=retro&r=pg",
              }}
            />
          </div>
        </header>

        <main className="mx-auto max-h-full  w-full max-w-7xl p-4">
          <Outlet />
        </main>
      </div>

      <ScrollRestoration />
    </>
  );
}

export function Topbar() {
  return (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  );
}
