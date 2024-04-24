import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import DetailPage from "../pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.getItem("authorization")) {
        throw redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: () => {
      if (localStorage.getItem("authorization")) {
        throw redirect("/");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <HomePage />,
    loader: () => {
      if (!localStorage.getItem("authorization")) {
        throw redirect("/login");
      }
      return null;
    },
  },
  {
    path: "/:id",
    element: <DetailPage />,
    loader: () => {
      if (!localStorage.getItem("authorization")) {
        throw redirect("/login");
      }
      return null;
    },
  },
]);

export default router;
