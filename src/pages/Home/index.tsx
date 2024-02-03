import { Suspense, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { useGetComboItems } from '@/apis';
import { ComboItem } from '@/interfaces/home';
import useStore from '@/stores';

import CarouselItem from './components/CarouselItem';
import RecommendCarouselItem from './components/RecommendCarouselItem';
import TLCarousel, {
  Fallback as TLCarouselFallback,
} from './components/TLCarousel';
import TopList, { Fallback as ListItemFallback } from './components/TopList';

const GuideSection = styled.section`
  width: 100%;
  height: 468px;
  background:
    url('/home-guide-background.png'),
    lightgray 50% / cover no-repeat;

  .guide-title {
    padding: 40px 0 36px 0;
    text-align: center;
  }
`;
const StyledSection = styled.section`
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
    margin: 20px 20px 40px 20px;
    display: flex;
    padding: 24px 20px;
    flex-direction: column;
    gap: 24px;
    border-radius: 20px;
    border: 2px solid var(--Gray-90, #1c1c1c);
    background: var(--Yellow-05, #fff4d6);
    box-shadow: 4px 4px 0px 0px #1c1c1c;

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
  const { comboItemStore } = useStore();
  const navigate = useNavigate();

  const handleClickComboItem = useCallback(
    (data: ComboItem) => {
      comboItemStore.setSelectedComboItem(data);
      navigate(`/content/${data.comboItemId}`);
    },
    [comboItemStore, navigate],
  );

  const handleClickList = useCallback(() => {
    navigate('/list');
  }, [navigate]);

  return (
    <>
      <GuideSection>
        <div className="guide-title headline02">맛렙 PICK 편의점 꿀조합템</div>
        <Suspense fallback={<TLCarouselFallback Item={CarouselItem} />}>
          <TLCarousel
            queryFn={useGetComboItems}
            Item={CarouselItem}
            onClick={handleClickComboItem}
          />
        </Suspense>
      </GuideSection>
      <StyledSection>
        <div className="list-title">꿀조합 인기 아이템 TOP 3위</div>
        <div className="list-container">
          <Suspense fallback={<ListItemFallback />}>
            <TopList />
          </Suspense>
          <button className="title02" onClick={handleClickList}>
            더 보러가기
          </button>
        </div>
      </StyledSection>
      <StyledSection>
        <div className="list-title">꿀꿀조합🐽이건 어때?</div>
        <Suspense fallback={<RecommendCarouselItem isLoading />}>
          <RecommendCarouselItem onClick={handleClickComboItem} />
        </Suspense>
      </StyledSection>
    </>
  );
};

export default observer(Home);
