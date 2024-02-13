import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Container } from "./components/index.js";
import {AllProducts, Home, Login, MenProducts, WomenProducts} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/products/all',
        element: <AllProducts/>
      },
      {
        path: '/products/men',
        element: <MenProducts/>
      },
      {
        path: '/products/women',
        element: <WomenProducts/>
      },
      {
        path: "*",
        element: <Container>currently not created yet</Container>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
