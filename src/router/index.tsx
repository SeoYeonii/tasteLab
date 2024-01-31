import { createBrowserRouter } from 'react-router-dom';

import Content from '@pages/Content';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Profile from '@pages/Profile';
import Test from '@pages/Test';

import ErrorBoundaryLayor from './components/ErrorBoundaryLayor';
import PATH from './PATH';

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
