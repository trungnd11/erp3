import React from 'react';
import { Switch, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/VerticalLayouts";
//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected, AccessRoute, hasAnyAuthority } from './AuthProtected';
import PrivateRoute from '../shared/auth/PrivateRoute';
import Profiles from '../pages/EmployeeList/Profiles';

const Index = () => {
    const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
    const availableAuthRoutesPath = authProtectedRoutes.map((r) => r.path);
    return (
        <React.Fragment>
            <Switch>
                <Route path={availablePublicRoutesPaths}>
                    <NonAuthLayout>
                        <Switch>
                            {publicRoutes.map((route, idx) => (
                                <Route
                                    path={route.path}
                                    component={route.component}
                                    key={idx}
                                    exact={true}
                                />
                            ))}
                        </Switch>
                    </NonAuthLayout>
                </Route>

                <Route path={availableAuthRoutesPath}>
                    <VerticalLayout>
                        <Switch>
                            {authProtectedRoutes.map((route, idx) => (
                                <PrivateRoute
                                    path={route.path}
                                    component={route.component}
                                    hasAnyAuthorities={route.hasAnyAuthorities}
                                    key={idx}
                                    exact={true}
                                />
                            ))}
                        </Switch>
                    </VerticalLayout>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default Index;