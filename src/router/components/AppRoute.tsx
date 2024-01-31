import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import Appbar from './\bAppbar';

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

  .footer {
    position: sticky;
    bottom: 0;
    height: 64px;
    border-top: 2px solid var(--Gray-90, #1c1c1c);
    background: #fff;
  }
`;

const AppRoute = () => {
  //   const navigate = useNavigate();
  console.log('AppRoute');
  return (
    <StyledWrapper>
      <Appbar />
      <div className="content-wrapper">
        <Outlet />
      </div>
      <div className="footer">tempFooter</div>
    </StyledWrapper>
  );
};

export default AppRoute;
