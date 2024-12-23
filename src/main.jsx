import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import RegisterPage from "./pages/register.jsx";
import LoginPage from "./pages/login.jsx";
import UserPage from "./pages/user.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import { ProductWrapper } from "./components/context/product.context.jsx";
import ProductDetailPage from "./pages/product.jsx";
import CartPage from "./pages/cart.jsx";
import PaymentPage from "./pages/payment.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/shopping-cart",
        element: <CartPage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductWrapper>
      <AuthWrapper>
        <RouterProvider router={router} />
      </AuthWrapper>
    </ProductWrapper>
  </StrictMode>,
);
