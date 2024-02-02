import { ErrorBoundary } from 'react-error-boundary';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import ErrorFallbackComponent from '@components/ErrorFallback';

import AppRoute from './AppRoute';

const ErrorBoundaryLayor = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ error }) => <ErrorFallbackComponent error={error} />}
      >
        <AppRoute />
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

export default ErrorBoundaryLayor;
