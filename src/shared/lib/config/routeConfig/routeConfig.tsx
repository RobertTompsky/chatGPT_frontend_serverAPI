import {
    About,
    Main,
    Profile,
    SignIn
} from "@/pages";
import { 
    Navigate, 
    Outlet, 
    RouteObject 
} from "react-router-dom";
import { useAppSelector } from "../../hooks";

enum AppRoutes {
    // публичные 
    SIGN_IN = 'sign_in',
    // приватные
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.SIGN_IN]: 'sign_in',

    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: 'about',
    [AppRoutes.PROFILE]: '/profile'
}

export const RouteConfig: Record<AppRoutes, RouteObject> = {
    [AppRoutes.SIGN_IN]: {
        path: RoutePath.sign_in,
        Component: SignIn
    },


    [AppRoutes.MAIN]: {
        index: true,
        Component: Main
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        Component: About
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        Component: Profile
    }
}

export const PublicRoutes =
    Object.values(RouteConfig)
        .slice(0, 1)
        .map(({
            Component,
            path,
        }) => ({
            path,
            Component
        }))

export const ProtectedRoutes =
    Object.values(RouteConfig)
        .slice(1)
        .map(({ Component, path, index }) => {
            if (Component === Main) {
                return {
                    Component,
                    index
                };
            } else {
                return {
                    Component,
                    path
                };
            }
        });


export const Public: React.FC = () => {
    return <Outlet />
};

export const Protected: React.FC = () => {
    const isAuthed = useAppSelector(state => state.auth.isAuthenticated)
    return isAuthed
        ? <Outlet />
        : <Navigate to={RoutePath.sign_in} replace />
};
