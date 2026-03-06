import { createBrowserRouter } from "react-router";
import MainLayout from "../mainLayout/MainLayout";
import Dashboard from "../Components/dashboard/Dashboard";
import EmployeeList from "../pages/employee/EmployeeList";
import NotFound from "../pages/error/NotFound";
import ErrorPage from "../pages/error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "employee/all",
        element: <EmployeeList />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
