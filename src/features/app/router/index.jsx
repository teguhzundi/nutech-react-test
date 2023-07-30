import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateLayout from '../layout/PrivateLayout.jsx';
import EmptyLayout from '../layout/EmptyLayout.jsx';
import CommonNotFound from '../../common/CommonNotFound.jsx';
import ProtectedRoute from '../hoc/ProtectedRoute.jsx';

const AuthLogin = lazy(() => import('@/features/auth/AuthLogin'));
const Product = lazy(() => import('@/features/product/Product'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute component={<PrivateLayout />} />,
    errorElement: <CommonNotFound />,
    children: [
      {
        index: true,
        element: <Product />
      }
    ]
  },
  {
    path: '/auth',
    element: <EmptyLayout />,
    errorElement: <CommonNotFound />,
    children: [
      {
        path: 'login',
        element: <AuthLogin />
      }
    ]
  }
]);

export default router;
