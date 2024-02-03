import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@/router/PATH';

import CommonErrorFallback from './CommonErrorFallback';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
const ErrorFallbackComponent = ({ error }: Props) => {
  const navigate = useNavigate();

  const resetApiInputValue = useMemo(() => {
    if ((error?.response?.status ?? 0) === 401) {
      localStorage.removeItem('loginToken');
      return () => navigate(PATH.LOGIN);
    }
    if (error?.config?.url.includes('')) {
      return () => undefined;
    }

    return () => undefined;
  }, [error]);

  return <CommonErrorFallback resetApiInputValue={resetApiInputValue} />;
};

export default ErrorFallbackComponent;
