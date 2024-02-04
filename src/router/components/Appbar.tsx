// eslint-disable-next-line object-curly-newline
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';

import { useDeleteLike, useGetIsLiked, usePostLike } from '@/apis';
import {
  ArrowLeftIcon,
  HeartFilledIcon,
  // BookmarkIcon,
  HeartIcon,
  LogoTitleIcon,
  // ShareIcon,
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

  const { comboItemId } = useParams();
  const [enabled, setEnabled] = useState(comboItemId !== undefined);
  const { data, isLoading } = useGetIsLiked({
    enabled,
    comboItemId: Number(comboItemId),
  });
  const { mutate } = usePostLike();
  const { mutate: deleteLike } = useDeleteLike();

  const handleClickLike = useCallback(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (comboItemId && loginToken !== null) {
      mutate(
        { comboItemId: Number(comboItemId) },
        { onSuccess: () => setEnabled(false) },
      );
    }
  }, [comboItemId, mutate]);

  const handleClickDislike = useCallback(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (comboItemId && loginToken !== null) {
      deleteLike({ comboItemId: Number(comboItemId) });
    }
  }, [comboItemId, deleteLike]);

  useEffect(() => {
    if (comboItemId) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [comboItemId]);

  const Content = useMemo(() => {
    const pathName = `/${pathname.split('/')[1]}`;

    switch (pathName) {
      case PATH.LIST:
        return <div className="center title01">꿀조합 자료실</div>;
      case PATH.PROFILE:
        return <div className="center title01">마이페이지</div>;
      case '/content':
        return (
          <>
            <div className="left" onClick={handleClickGoBack}>
              <ArrowLeftIcon />
            </div>
            <div className="right">
              {!data && !isLoading && (
                <div className="button-container" onClick={handleClickLike}>
                  <HeartIcon />
                </div>
              )}
              {data && !isLoading && (
                <div className="button-container" onClick={handleClickDislike}>
                  <HeartFilledIcon />
                </div>
              )}
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
  }, [
    data,
    handleClickDislike,
    handleClickGoBack,
    handleClickLike,
    isLoading,
    pathname,
  ]);

  return (
    <StyledAppbar style={{ display: pathname === PATH.LOGIN ? 'none' : '' }}>
      {Content}
    </StyledAppbar>
  );
};

export default Appbar;
