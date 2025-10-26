import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import RootLayout from "./layouts/RootLayout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router";
import Products from "./pages/Products.jsx";
import Category from "./pages/Category.jsx";
import Orders from "./pages/Orders.jsx";
import Setting from "./pages/Setting.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/categories",
        element: <Category />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/settings",
        element: <Setting />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
