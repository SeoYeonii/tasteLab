import { Suspense, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import NavTitle from '@/components/NavTitle';

import GuideCarousel, {
  Fallback as GuideCarouselFallback,
} from './components/GuideCarousel';

const FindSection = styled.section`
  padding-top: 42px;
`;

const Home = () => {
  const navigate = useNavigate();

  const handleClickList = useCallback(() => {
    navigate('/list');
  }, [navigate]);
  return (
    <>
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
