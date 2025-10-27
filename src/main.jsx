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
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import VerifyOTP from "./pages/VerifyOtp.jsx";

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
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/verify-otp",
    element: <VerifyOTP/>
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
