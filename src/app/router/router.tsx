import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { NotFound } from "@/pages";
import { basePath } from "@/shared/lib/variables";
import { 
    Protected, 
    ProtectedRoutes, 
    Public, 
    PublicRoutes 
} from "@/shared/lib/config";

export const router = createBrowserRouter([
    {
        path: basePath,
        Component: App,
        errorElement: <NotFound />,
        children: [
            {
                Component: Public,
                children: PublicRoutes
            },
            {
                Component: Protected,
                children: ProtectedRoutes
            }
        ]
    }
])