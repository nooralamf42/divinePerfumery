import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AdminLogin,
  AdminProductsPanel,
  AllProducts,
  Home,
  Login,
  MenProducts,
  NotFoundPage,
  WomenProducts,
} from "./pages";
import { Provider } from "react-redux";
import store from './store/store.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/products/all",
        element: <AllProducts />,
      },
      {
        path: "/products/men",
        element: <MenProducts />,
      },
      {
        path: "/products/women",
        element: <WomenProducts />,
      },
      {
        path: "/login/admin",
        element: <AdminLogin />,
      },
      {
        path: "/products/admin",
        element: <AdminProductsPanel />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
