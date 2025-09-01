import React from "react";
import { BrowserRouter, Routes, Route, RouteObject } from "react-router-dom";

import { dImport } from "./utilities/helper";
import process from "process";
window.process = process;

const Home = dImport("Home");
// const Ai = dImport("ai");
// const Service = dImport("service");
// const Profile = dImport("profile");
// const Signup = dImport("signup");

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
    },
    // {
    //   path: `${basePath}`,
    //   element: <Ai />,
    // },
    // {
    //   path: `${basePath}`,
    //   element: <Service />,
    // },
    // {
    //   path: `${basePath}`,
    //   element: <Profile />,
    // },
    // {
    //   path: `${basePath}`,
    //   element: <Signup />,
    // },
  ];

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>{renderRoutes(routes)}</Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};
