import React from "react";
import { BrowserRouter, Routes, Route, RouteObject } from "react-router-dom";

import { dImport } from "./utilities/helper";
import process from "process";
window.process = process;

const Home = dImport("Home");
const Ai = dImport("Ai");
const Service = dImport("Service");
const Profile = dImport("Profile");
const Signup = dImport("Signup");

const basePath = process.env.PUBLIC_URL || "/rp";

const renderRoutes = (routes: RouteObject[]) => {
  return routes.map((route, index) => {
    const { path, element, children } = route;
    return (
      <Route key={index} path={path} element={element}>
        {children && renderRoutes(children)}
      </Route>
    );
  });
};

export const App: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: `${basePath}`,
      element: <Home />,
      children: [
        {
          path: "service",
          element: <Service />,
        },
        {
          path: "Ai",
          element: <Ai />,
        },
        {
          path: "Signup",
          element: <Signup />,
        },
        {
          path: "Profile",
          element: <Profile />,
        },
      ],
    },
  ];

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>{renderRoutes(routes)}</Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};
