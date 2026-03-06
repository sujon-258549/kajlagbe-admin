import { createBrowserRouter } from "react-router";
import MainLayout from "../mainLayout/MainLayout";
import Dashboard from "../Components/dashboard/Dashboard";
import EmployeeList from "../pages/employee/EmployeeList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "employee/all",
        element: <EmployeeList />,
      },
    ],
  },
]);

export default router;
