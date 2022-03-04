import React, { lazy, Suspense } from 'react';
import { Router,Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const Sidebar = lazy(() => import('./modules/home/components/Sidebar'));
const ProductPage = lazy(() => import('./modules/home/pages/ProductPage'));
const UserPage = lazy(() => import('./modules/home/pages/UserPage'));

interface Props { }

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
