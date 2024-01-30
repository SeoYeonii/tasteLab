/* eslint-disable camelcase */
import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import axios from 'axios';
import { styled } from 'styled-components';

import { KakaoAuthInfo } from '@/interfaces/login';

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
    height: 350px;
    flex-shrink: 0;
    background: #d9d9d9;
  }

  .button-container {
    img {
      border-radius: 8px;
    }
    img:hover {
      box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.25);
    }
    .disabled {
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
      top: 68.8%;
      left: 48%;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = useMemo(() => searchParams.get('code'), [searchParams]);

  useEffect(() => {
    if (code !== null) {
      (async () => {
        try {
          const kakaoAccessToken = await axios({
            method: 'POST',
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            url: 'https://kauth.kakao.com/oauth/token',
            data: {
              grant_type: 'authorization_code',
              client_id: KAKAO_LOGIN_REST_API_KEY,
              redirect_uri: KAKAO_LOGIN_REDIRECT_URI,
              code,
            },
          })
            .then((res) => res.data)
            .then((res) => {
              const { access_token } = res;
              return access_token;
            });

          const response: KakaoAuthInfo = await axios({
            method: 'GET',
            headers: {
              Authorization: `Bearer ${kakaoAccessToken}`, // 카카오 토큰 api로 얻은 accesstoken 보내기
            },
            url: 'https://kapi.kakao.com/v2/user/me',
          }).then((res) => res.data);

          /** @TODO 서버와 통신 해야함 일단 로컬에만 저장 */
          localStorage.setItem('kakaoLoginInfo', JSON.stringify(response));
          localStorage.setItem('kakaoLoginId', JSON.stringify(response.id));
          navigate('/');
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [code, navigate]);

  return (
    <StyledDiv>
      <div className="welcome">로고 or 환영문구</div>
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
