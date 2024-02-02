import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import {
  ArrowLeftIcon,
  BookmarkIcon,
  LogoTitleIcon,
  ShareIcon,
} from '@/assets';

import PATH from '../PATH';

const StyledAppbar = styled.section`
  width: 100%;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #f6f6f6;

  .item {
    display: inline-flex;
  }

  svg {
    border-radius: 0;
    &:hover {
      box-shadow: none;
      cursor: default;
    }
  }

  .center {
    width: 100%;
    text-align: center;
  }

  .left {
    display: inline-flex;
  }
  .right {
    display: inline-flex;

    .button-container {
      display: inline-flex;
      gap: 16px;
    }
  }
`;

const Appbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleClickGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const Content = useMemo(() => {
    switch (pathname) {
      case PATH.PROFILE:
        return <div className="center title01">마이페이지</div>;
      case PATH.CONTENT:
        return (
          <>
            <div className="left" onClick={handleClickGoBack}>
              <ArrowLeftIcon />
            </div>
            <div className="right">
              <div className="button-container">
                <ShareIcon />
                <BookmarkIcon />
              </div>
            </div>
          </>
        );
      case PATH.HOME:
      default:
        return (
          <div className="left title01">
            <LogoTitleIcon />
          </div>
        );
    }
  }, [handleClickGoBack, pathname]);

  return (
    <StyledAppbar style={{ display: pathname === PATH.LOGIN ? 'none' : '' }}>
      {Content}
    </StyledAppbar>
  );
};

export default Appbar;
