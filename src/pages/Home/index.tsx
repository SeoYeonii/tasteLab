import { Suspense, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { PersonIcon } from '@/assets/index';
import NavTitle from '@/components/NavTitle';
import PATH from '@/router/PATH';
import StyledAppbar from '@components/Styled/StyledAppbar';

import GuideCarousel, {
  Fallback as GuideCarouselFallback,
} from './components/GuideCarousel';

const FindSection = styled.section`
  padding-top: 42px;
`;

const Home = () => {
  const navigate = useNavigate();

  const handleClickLogin = useCallback(() => {
    const loginInfo = localStorage.getItem('kakaoLoginInfo');
    if (loginInfo !== null) {
      navigate(PATH.PROFILE);
    } else navigate(PATH.LOGIN);
  }, [navigate]);

  const handleClickList = useCallback(() => {
    navigate('/list');
  }, [navigate]);
  return (
    <>
      <StyledAppbar>
        <div className="left title01">로고</div>
        <div className="right">
          <div onClick={handleClickLogin}>
            <PersonIcon />
          </div>
        </div>
      </StyledAppbar>
      <Suspense fallback={<GuideCarouselFallback />}>
        <GuideCarousel />
      </Suspense>
      <FindSection>
        <NavTitle title="꿀조합 인기 아이템" onClick={handleClickList} />
      </FindSection>
    </>
  );
};

export default Home;
