import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import ErrorFallbackComponent from '@components/ErrorFallback';

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

export default ErrorBoundaryLayor;
