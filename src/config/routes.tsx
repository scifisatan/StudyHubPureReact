import { createBrowserRouter } from "react-router-dom";
import { Files } from "@/routes/files";
import { Home } from "@/routes/home";
import { Lectures } from "@/routes/lectures";
import { Login } from "@/routes/login";
import { NotFound } from "@/routes/not-found";
import { Root } from "@/routes/root";
import { TeacherDashboard } from "@/routes/teacher-dashboard";
import { Youtube } from "@/routes/youtube";

export const router = createBrowserRouter([
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
    path: "/teacher",
    element: <TeacherDashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
