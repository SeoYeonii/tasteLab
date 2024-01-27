import { createBrowserRouter } from 'react-router-dom';

import Test from '@pages/Test';

import AppRoutes from './AppRoutes';
import PATH from './PATH';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppRoutes />,
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
