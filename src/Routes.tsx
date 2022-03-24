import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const HomePage = lazy(() => import('./modules/home/pages/HomePage'));



export const Routes = () => {
  const location = useLocation();


  return (
    <Suspense fallback={<div></div>}>
      <Switch location={location}>
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
