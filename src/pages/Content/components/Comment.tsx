import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog } from '@mui/material';
import styled from 'styled-components';

import { useGetComments } from '@/apis';
import { KakaoIcon } from '@/assets';
import PATH from '@/router/PATH';

const StyledSection = styled.section`
  display: flex;
  padding: 24px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  .title-container {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;

    .right {
      display: inline-flex;
      align-items: center;
      .login {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 18px; /* 128.571% */
        text-decoration-line: underline;
        padding-right: 4px;
        cursor: pointer;
      }
    }
  }

  .comment-container {
  }

  .comments-container {
  }

  .no-comments-container {
    display: flex;
    flex-direction: column;
    height: 160px;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

const StyledDialog = styled(Dialog)`
  &.MuiModal-root {
    width: 100%;
  }

  .MuiDialog-paper {
    display: flex;
    width: 320px;
    padding: 32px 0px 24px 0px;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .title {
    color: var(--Gray-90, #1c1c1c);
    text-align: center;
    font-family: 'Pretendard Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 166.667% */
  }
  .button-container {
    display: flex;
    width: 280px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    button {
      display: inline-flex;
      height: 48px;
      padding: 0px 20px;
      justify-content: center;
      align-items: center;
      align-self: stretch;
      cursor: pointer;
      border: none;
      border-radius: 8px;
    }

    .kakao {
      background: #fee500;

      .title03 {
        color: var(--Gray-90, #1c1c1c);
      }
    }

    .close {
      color: var(--Gray-70, #5f5f5f);
      background: var(--Gray-05, #f6f6f6);
    }
  }
`;

export const Fallback = () => (
  <StyledSection>
    <div className="title-container"></div>
    <div className="comment-container"></div>
    <div className="comments-container"></div>
  </StyledSection>
);

interface Props {}

const Comment = () => {
  const navigate = useNavigate();
  const { data } = useGetComments();
  const loginToken = localStorage.getItem('loginToken') ?? '';
  const [open, setOpen] = useState(false);
  const handleClickLogin = useCallback((val: boolean) => {
    setOpen(val);
  }, []);
  const handleClickKakao = useCallback(() => {
    navigate(PATH.LOGIN);
  }, [navigate]);

  return (
    <>
      <StyledSection>
        <div className="title-container">
          <div className="headline02">{`댓글(${3})`}</div>
          {loginToken.length === 0 && (
            <div className="right body02">
              <span className="login" onClick={() => handleClickLogin(true)}>
                로그인
              </span>
              후 댓글을 남겨보세요
            </div>
          )}
        </div>
        <div className="comment-container"></div>
        <div className="comments-container"></div>
      </StyledSection>
      <StyledDialog open={open} onClose={() => handleClickLogin(false)}>
        <div className="title-container">
          <div className="title">로그인하시고 맛렙을</div>
          <div className="title">더 알차게 즐겨보세요 : )</div>
        </div>
        <div className="button-container">
          <button type="button" className="kakao" onClick={handleClickKakao}>
            <KakaoIcon />
            <div className="title03">카카오로 로그인/회원가입</div>
          </button>
          <button
            type="button"
            className="close title03"
            onClick={() => handleClickLogin(false)}
          >
            로그인 안하고 더 구경할게요!
          </button>
        </div>
      </StyledDialog>
    </>
  );
};

export default Comment;
