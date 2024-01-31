import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

const StyledAppbar = styled.section`
  width: 100%;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #f6f6f6;

  .center {
    width: 100%;
    text-align: center;
  }
`;

const Appbar = () => {
  const { pathname } = useLocation();

  const Content = useMemo(() => {
    switch (pathname) {
      case '/profile':
        return <div className="center title01">마이페이지</div>;
      case '/':
      default:
        return <div className="left title01">로고</div>;
    }
  }, [pathname]);

  return <StyledAppbar>{Content}</StyledAppbar>;
};

export default Appbar;
