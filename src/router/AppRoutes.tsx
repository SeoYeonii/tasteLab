import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const AppRoutes = (): ReactElement => (
  <Container>
    <Outlet />
  </Container>
);

export default AppRoutes;
