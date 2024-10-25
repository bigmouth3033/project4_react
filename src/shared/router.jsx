import { createBrowserRouter } from "react-router-dom";
import CustomerLayout from "./layout/CustomerLayout";
import HomePage from "@/feature/customer/homepage/HomePage";
import DashBoard from "@/feature/admin/dashboard/DashBoard";
import AdminLayout from "./layout/AdminLayout";
import AdminLogin from "@/feature/admin/admin_login/AdminLogin";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <CustomerLayout />,
      children: [{ path: "", element: <HomePage /> }],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <DashBoard />,
        },
      ],
    },
    {
      path: "/admin_login",
      element: <AdminLogin />,
    },
  ],
  { basename: "/UrbanNest" }
);

export default router;
