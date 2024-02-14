import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {AdminLogin, AdminProductsPanel, AllProducts, Home, Login, MenProducts, NotFoundPage, WomenProducts} from "./pages";

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
        path: '/admin/login',
        element: <AdminLogin/>
      },
      {
        path: '/admin/products',
        element: <AdminProductsPanel/>
      },
      {
        path: "*",
        element: <NotFoundPage/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
