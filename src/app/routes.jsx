import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import Users from './views/users/Users';
import Products from './views/users/Products';
import VerifyUser from './views/users/VerifyUser';
import UnVerifyUser from './views/users/UnVerifyUser';
import UserDetails from './views/users/UserDetails';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));
// const Users = Loadable(lazy)

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },

      // e-chart rooute
      // {
      //   path: '/charts/echarts',
      //   element: <AppEchart />,
      //   auth: authRoles.editor
      // }
      //users
      {
        path: '/users/all',
        element: <Users />,
        auth: authRoles.admin
      },
      {
        path: '/user/verify/:userId',
        element: <VerifyUser />,
        auth: authRoles.admin
      },
      {
        path: '/user/verify/:userId',
        element: <UnVerifyUser />,
        auth: authRoles.admin
      },
      {
        path: '/user/details/:userId',
        element: <UserDetails />,
        auth: authRoles.admin
      },
      //users

      //products
      {
        path: '/products/all',
        element: <Products />,
        auth: authRoles.admin
      },
      {
        path: '/products/accepted',
        element: <Products />,
        auth: authRoles.admin
      },
      {
        path: '/products/delivered',
        element: <Products />
      },
      {
        path: '/products/rejected',
        element: <Products />,
        auth: authRoles.admin
      }
      //products
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
