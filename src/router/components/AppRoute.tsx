import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import Appbar from './Appbar';
import Footer from './Footer';

const StyledWrapper = styled.div`
  .content-wrapper {
    overflow-y: auto;
    height: calc(100vh - 48px - 64px);
  }
  @media (min-width: 370px) and (min-height: 810px) {
    .content-wrapper {
      height: calc(800px - 48px - 64px);
    }
  }
`;

const AppRoute = () => (
  <StyledWrapper>
    <Appbar />
    <div className="content-wrapper">
      <Outlet />
    </div>
    <Footer />
  </StyledWrapper>
);

export default AppRoute;
