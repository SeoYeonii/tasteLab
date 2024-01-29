import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { styled } from 'styled-components';

import { useGetComboItems } from '@/apis';

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
      >
        {new Array(5).fill(0).map((_, i) => (
          <CarouselItem key={i} isLoading={true} />
        ))}
      </Carousel>
    </div>
  </GuideSection>
);

const GuideCarousel = () => {
  const { data, isLoading } = useGetComboItems();

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
        >
          {data.map((comboItem) => (
            <CarouselItem
              key={comboItem.id}
              isLoading={isLoading}
              comboItem={comboItem}
            />
          ))}
        </Carousel>
      </div>
    </GuideSection>
  );
};

export default GuideCarousel;
