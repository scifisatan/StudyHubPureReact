import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
  useMatch,
} from "react-router-dom";
import BreadcrumbRoute from "@/components/breadcrumb-route";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { PrivateRoute } from "@/routes/private";
import {
  BookOpen,
  Files,
  FileText,
  Home,
  Menu,
  Mic,
  Youtube,
} from "lucide-react";

function NavigationItem({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: React.ReactNode;
  icon: React.ElementType;
}) {
  const match = useMatch(to);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* Note: NavLink does not work with asChild */}
        <Link
          to={to}
          className={cn(
            "rounded-lg p-2",
            match ? "bg-primary hover:bg-primary/90" : "hover:bg-accent",
          )}
        >
          <Icon className={cn("size-6", match && "text-primary-foreground")} />
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

function Navigation() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[72px] border-r bg-background sm:block">
      <div className="flex flex-col justify-center p-2 pt-4">
        <a href="/" className="flex items-center justify-center">
          <div className="rounded-full bg-accent">
            <BookOpen className="size-14 p-2 text-primary" />
          </div>
        </a>
      </div>

      <TooltipProvider>
        <nav className="flex flex-col gap-4 p-4">
          <NavigationItem to="/dashboard" icon={Home} label="Dashboard" />
          <NavigationItem to="/lectures" icon={Mic} label="Lectures" />
          <NavigationItem to="/youtube" icon={Youtube} label="Youtube" />
          <NavigationItem to="/files" icon={FileText} label="Files" />
        </nav>
      </TooltipProvider>
    </aside>
  );
}

function MobileNavigationItem(props: {
  to: string;
  onClick: () => void;
  icon: React.ElementType;
  label: React.ReactNode;
}) {
  const Icon = props.icon;

  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-4 rounded-lg p-2",
          isActive ? "bg-primary hover:bg-primary/90" : "hover:bg-accent",
        )
      }
      onClick={props.onClick}
    >
      {({ isActive }) => (
        <>
          <Icon
            className={cn("size-6", isActive && "text-primary-foreground")}
          />
          <span
            className={cn("text-base", isActive && "text-primary-foreground")}
          >
            {props.label}
          </span>
        </>
      )}
    </NavLink>
  );
}

function MobileNavigation(props: { open: boolean; onOpenChange: () => void }) {
  return (
    <Sheet open={props.open} onOpenChange={props.onOpenChange}>
      <SheetContent
        className="max-w-72"
        side="left"
        aria-describedby={undefined}
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <nav className="mr-6 flex flex-col gap-4">
          <MobileNavigationItem
            to="/lectures"
            onClick={props.onOpenChange}
            icon={Mic}
            label="Lectures"
          />
          <MobileNavigationItem
            to="/youtube"
            onClick={props.onOpenChange}
            icon={Youtube}
            label="Youtube"
          />
          <MobileNavigationItem
            to="/files"
            onClick={props.onOpenChange}
            icon={Files}
            label="Files"
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function Component() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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

  let location = useLocation();
  let currentRoute = location.pathname.split("/")[1];

  currentRoute = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);
  const baseStyle = `flex flex-col w-col ${currentRoute != "Teacher" || "Student" ? "sm:pl-[72px]" : ""}`;
  return (
    <>
      <>
        <Navigation />

        <MobileNavigation
          open={isSheetOpen}
          onOpenChange={() => setIsSheetOpen(false)}
        />
      </>

      <div className={baseStyle}>
        <header className="sticky top-0 z-50 bg-transparent backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
            <Button
              variant="outline"
              size="icon"
              className="flex sm:hidden"
              onClick={() => setIsSheetOpen(true)}
            >
              <Menu />
            </Button>
            <h1 className="grow text-2xl font-medium">{currentRoute}</h1>

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

        <main className="mx-auto w-full max-w-7xl p-4">
          <BreadcrumbRoute />

          <Outlet />
        </main>
      </div>

      <ScrollRestoration />
    </>
  );
}

export function Root() {
  return (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  );
}
