import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router-dom';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import ErrorFallbackComponent from '@components/ErrorFallback';
import Test from '@pages/Test';

import AppRoutes from './AppRoutes';
import PATH from './PATH';

const ErrorBoundaryLayor = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ error }) => <ErrorFallbackComponent error={error} />}
      >
        <AppRoutes />
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
          element: <div>Home</div>,
        },
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
