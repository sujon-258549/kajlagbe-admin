import { createBrowserRouter } from "react-router";
import MainLayout from "../mainLayout/MainLayout";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />
    }
]);
    
export default router;
