/* eslint-disable camelcase */
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { styled } from 'styled-components';

import {
  useGetKakaoLoginInfo,
  usePostKakaoAccessToken,
  usePostKakaoLoginInfo,
} from '@/apis';
import { LogoIcon, LogoTitleIcon } from '@/assets';
import PATH from '@/router/PATH';

const KAKAO_LOGIN_REST_API_KEY = import.meta.env.VITE_KAKAO_LOGIN_REST_API_KEY;
const KAKAO_LOGIN_REDIRECT_URI = import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI;

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 76px;

  .welcome {
    width: 350px;
    height: 480px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;

    svg {
      border-radius: 0;
    }
    svg:hover {
      box-shadow: none;
    }
    svg:first-child {
      width: 85.5px;
      height: 72.5px;
      flex-shrink: 0;
    }
    svg:last-child {
      width: 76px;
      height: 34.566px;
      flex-shrink: 0;
    }
  }

  .button-container {
    img {
      border-radius: 8px;
    }
    img:hover {
      box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.25);
    }
    .disabled {
      pointer-events: none;
      cursor: default;
      img:hover {
        box-shadow: none;
      }
    }
    /** spinner */
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .spinner {
      border: 3px solid rgba(0, 0, 0, 0.1);
      border-top: 3px solid var(--yellow50);
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: spin 1s linear infinite;
      margin: 20px auto;
      position: absolute;
      top: 69.8%;
      left: 48%;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const loginToken = useMemo(() => localStorage.getItem('loginToken'), []);

  const [searchParams] = useSearchParams();
  const code = useMemo(() => searchParams.get('code'), [searchParams]);

  const { mutate: accessTokenMutate } = usePostKakaoAccessToken();
  const { mutate: loginInfoMutate } = useGetKakaoLoginInfo();
  const { mutate } = usePostKakaoLoginInfo();

  const handleClickLogo = useCallback(() => {
    navigate(PATH.HOME);
  }, [navigate]);

  useEffect(() => {
    if (loginToken !== null) navigate(PATH.HOME);
  }, [loginToken, navigate]);

  useEffect(() => {
    if (code !== null) {
      accessTokenMutate(
        { code },
        {
          onSuccess: (tokenInfo) => {
            const { access_token } = tokenInfo;
            loginInfoMutate(
              { kakaoAccessToken: access_token },
              {
                onSuccess: (loginInfo) => {
                  mutate(
                    {
                      name: loginInfo.kakao_account.profile.nickname,
                      email: loginInfo.kakao_account.email,
                      picture:
                        loginInfo.kakao_account.profile.profile_image_url,
                    },
                    {
                      onSuccess: (res) => {
                        localStorage.setItem('loginToken', JSON.stringify(res));
                        window.dispatchEvent(new Event('storage'));
                        navigate(PATH.HOME);
                      },
                    },
                  );
                },
              },
            );
          },
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledDiv>
      <div className="welcome" onClick={handleClickLogo}>
        <LogoIcon />
        <LogoTitleIcon />
      </div>
      <div className="button-container">
        <a
          className={code === null ? '' : 'disabled'}
          href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_LOGIN_REST_API_KEY}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URI}`}
        >
          <img src="/kakao-login-medium-wide.png" alt="카카오 로그인" />
          {code !== null && <div className="spinner"></div>}
        </a>
      </div>
    </StyledDiv>
  );
};

export default Login;
