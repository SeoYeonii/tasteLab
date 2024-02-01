import { useCallback } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { useGetComboItems } from '@/apis';
import PATH from '@/router/PATH';

import CarouselItem from './CarouselItem';

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

  .carousel-root > .carousel-slider {
    height: 328px;
  }

  .control-dots {
    margin: 50px 0 0 0;
  }
`;

export const Fallback = () => (
  <GuideSection>
    <div className="guide-title headline02">맛렙 PICK 편의점 꿀조합템</div>
    <div>
      <Carousel
        showArrows={false}
        centerMode
        centerSlidePercentage={80}
        showStatus={false}
        autoPlay
        infiniteLoop
        stopOnHover
        interval={5000}
        showThumbs={false}
      >
        {new Array(5).fill(0).map((_, i) => (
          <CarouselItem key={i} isLoading={true} />
        ))}
      </Carousel>
    </div>
  </GuideSection>
);

const GuideCarousel = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetComboItems();
  const handleClickItem = useCallback(
    (id: string) => navigate(PATH.CONTENT, { state: { id } }),
    [navigate],
  );

  return (
    <GuideSection>
      <div className="guide-title headline02">맛렙 PICK 편의점 꿀조합템</div>
      <div>
        <Carousel
          showArrows={false}
          centerMode
          centerSlidePercentage={80}
          showStatus={false}
          autoPlay
          infiniteLoop
          stopOnHover
          interval={5000}
          showThumbs={false}
        >
          {data.map((comboItem) => (
            <CarouselItem
              key={comboItem.id}
              isLoading={isLoading}
              comboItem={comboItem}
              onClick={handleClickItem}
            />
          ))}
        </Carousel>
      </div>
    </GuideSection>
  );
};

export default GuideCarousel;
