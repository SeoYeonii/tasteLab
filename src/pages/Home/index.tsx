import { Suspense, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import GuideCarousel, {
  Fallback as GuideCarouselFallback,
} from './components/GuideCarousel';
import TopList, { Fallback as ListItemFallback } from './components/TopList';

const FindSection = styled.section`
  .list-title {
    margin: 40px 0 20px 0;
    padding: 8px 20px;
    color: var(--Gray-90, #1c1c1c);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 120% */
  }
  .list-container {
    margin: 20px;
    display: flex;
    padding: 24px 20px;
    flex-direction: column;
    gap: 24px;
    border-radius: 20px;
    border: 2px solid var(--Gray-90, #1c1c1c);
    background: var(--Yellow-05, #fff4d6);

    button {
      display: flex;
      height: 48px;
      padding: 0px 20px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      align-self: stretch;
      border-radius: 8px;
      border: 2px solid var(--Gray-90, #1c1c1c);
      background: var(--Yellow-40, #ffc933);
      color: var(--Gray-90, #1c1c1c);

      &:hover {
        cursor: pointer;
        box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.25);
      }
    }
  }
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
        <div className="list-title">꿀조합 인기 아이템 TOP 3위</div>
        <div className="list-container">
          <Suspense fallback={<ListItemFallback />}>
            <TopList />
          </Suspense>
          <button className="title02" onClick={handleClickList}>
            더 보러가기
          </button>
        </div>
      </FindSection>
    </>
  );
};

export default Home;
