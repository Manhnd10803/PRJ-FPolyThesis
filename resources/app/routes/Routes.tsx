import { Fragment, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AdminGuard, AuthGuard } from "@/components/guard";
import AuthLayout from "@/layouts/auth";
import Home from "@/pages/Home";
import { PATH_NAME } from "@/routes/pathName";
import RoleRoute from "./RoleRoute";
import MainLayout from "@/layouts/main";
import { AdminLayout } from "@/layouts/admin-layout";
import { RoutesType } from "@/models/routes.model";

//==================== Lazy load pages ====================//

const Error404View = lazy(() => import("@/pages/404"));
const Login = lazy(() => import("@/pages/login"));
const Signup = lazy(() => import("@/pages/Signup"));

// Data routes config for react router dom
const routesConfig: RoutesType[] = [
    //========================== Default routes ==========================//
    {
        path: PATH_NAME.ROOT,
        component: () => <Navigate to={PATH_NAME.HOME} replace />,
    },
    {
        path: PATH_NAME.ERROR_404,
        component: Error404View,
    },
    //========================== Auth routes ==========================//
    {
        path: "/",
        guard: AuthGuard,
        layout: AuthLayout,
        routes: [
            {
                path: PATH_NAME.LOGIN,
                component: Login,
                requireRoles: [],
            },
            {
                path: PATH_NAME.SIGNUP,
                component: Signup,
                requireRoles: [],
            },
            {
                component: () => <Navigate to={PATH_NAME.ERROR_404} />,
            },
        ],
    },
    {
        path: "/",
        guard: AuthGuard,
        layout: MainLayout,
        routes: [
            {
                path: PATH_NAME.HOME,
                component: Home,
                requireRoles: [],
            },

            {
                component: () => <Navigate to={PATH_NAME.ERROR_404} />,
            },
        ],
    },
    //========================== Admin routes ==========================//
    {
        path: "/admin",
        guard: AdminGuard,
        layout: AdminLayout,
        routes: [
            {
                path: PATH_NAME.ADMIN,
                component: Home,
                requireRoles: [],
            },
            {
                component: () => <Navigate to={PATH_NAME.ERROR_404} />,
            },
        ],
    },
    //=================== Not found page ===================//
    {
        path: "*",
        component: () => <Navigate to={PATH_NAME.ERROR_404} />,
    },
];

const renderNestedRoutes = (routes: RoutesType[], guard: any) => {
    return routes.map((route: RoutesType, index: number) => {
        const Guard = guard || Fragment;
        const Component = route.component;
        const requireRoles = route.requireRoles || [];

        return (
            <Route
                key={`routes-nested-${index}`}
                path={route.path}
                element={
                    <Suspense fallback={null}>
                        <Guard>
                            <RoleRoute requireRoles={requireRoles}>
                                <Component />
                            </RoleRoute>
                        </Guard>
                    </Suspense>
                }
            ></Route>
        );
    });
};

const renderRoutes = (routesConfig: RoutesType[]) => {
    return (
        <Routes>
            {routesConfig.map((route: RoutesType, index: number) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;
                const requireRoles = route.requireRoles || [];

                // If route has nested routes, render nested routes
                if (route.routes && route.layout) {
                    return (
                        <Route
                            key={`routes-${index}`}
                            path={route.path}
                            element={<Layout />}
                        >
                            {renderNestedRoutes(route.routes, route.guard)}
                        </Route>
                    );
                }

                // Else render route
                return (
                    <Route
                        key={`routes-${index}`}
                        path={route.path}
                        element={
                            <Suspense fallback={null}>
                                <Guard>
                                    <RoleRoute requireRoles={requireRoles}>
                                        <Component />
                                    </RoleRoute>
                                </Guard>
                            </Suspense>
                        }
                    ></Route>
                );
            })}
        </Routes>
    );
};

function MyRoutes() {
    return renderRoutes(routesConfig);
}

export default MyRoutes;
