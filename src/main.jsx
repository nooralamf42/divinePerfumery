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
  Product,
  WomenProducts,
} from "./pages";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Protected } from "./components/index.js";

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
        element: <Protected>
            <Login />
          </Protected>
          ,
      },
      {
        path: "/products/all",
        element: <AllProducts />,
      },
      {
        path:'/product/:productId',
        element: <Product/>
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
        element: <Protected><AdminLogin /></Protected>,
      },
      {
        path: "/products/admin",
        element: <Protected><AdminProductsPanel /></Protected>,
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
