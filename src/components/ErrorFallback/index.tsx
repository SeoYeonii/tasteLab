import { useMemo } from 'react';

import CommonErrorFallback from './CommonErrorFallback';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
const ErrorFallbackComponent = ({ error }: Props) => {
  const resetApiInputValue = useMemo(() => {
    if (error?.config?.url.includes('') || true) {
      return () => undefined;
    }

    return undefined;
  }, [error]);

  return <CommonErrorFallback resetApiInputValue={resetApiInputValue} />;
};

export default ErrorFallbackComponent;
