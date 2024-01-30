import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import Profile from '@/pages/Profile';
import ErrorFallbackComponent from '@components/ErrorFallback';
import Content from '@pages/Content';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Test from '@pages/Test';

import PATH from './PATH';

const ErrorBoundaryLayor = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ error }) => <ErrorFallbackComponent error={error} />}
      >
        <Outlet />
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ErrorBoundaryLayor />,
      children: [
        {
          path: '',
          index: true,
          element: <Home />,
        },
        { path: PATH.CONTENT, element: <Content /> },
        { path: PATH.LOGIN, element: <Login /> },
        { path: PATH.PROFILE, element: <Profile /> },
        {
          path: PATH.TEST,
          element: <Test />,
        },
      ],
      errorElement: <div>404 Not Found</div>,
    },
  ],
  {
    basename: '/',
  },
);

export default router;
