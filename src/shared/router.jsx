import { createBrowserRouter } from "react-router-dom";
import CustomerLayout from "./layout/CustomerLayout";
import HomePage from "@/feature/customer/homepage/HomePage";
import DashBoard from "@/feature/admin/dashboard/DashBoard";
import AdminLayout from "./layout/AdminLayout";

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
  ],
  { basename: "/UrbanNest" }
);

export default router;
