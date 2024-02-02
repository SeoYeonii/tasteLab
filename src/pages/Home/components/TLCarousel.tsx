import { ElementType } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { UseSuspenseQueryResult } from '@tanstack/react-query';
import { styled } from 'styled-components';

import { ComboItem, RecommendItem } from '@/interfaces/home';

const StyledDiv = styled.div`
  .carousel-root > .carousel-slider {
    height: 328px;
  }

  .control-dots {
    margin: 50px 0 0 0;
  }

  .carousel .slider-wrapper {
    overflow: visible;
  }
`;
interface Props {
  queryFn: () => UseSuspenseQueryResult<ComboItem[] | RecommendItem[]>;
  Item: ElementType;
  // eslint-disable-next-line no-unused-vars
  onClick?: (id: string) => void;
  showIndicators?: boolean;
  centerSlidePercentage?: number;
}
export const Fallback = ({
  Item,
  showIndicators = true,
  centerSlidePercentage = 80,
}: Pick<Props, 'Item' | 'showIndicators' | 'centerSlidePercentage'>) => (
  <StyledDiv>
    <Carousel
      showArrows={false}
      centerMode
      centerSlidePercentage={centerSlidePercentage}
      showStatus={false}
      autoPlay
      infiniteLoop
      stopOnHover
      interval={5000}
      showThumbs={false}
      showIndicators={showIndicators}
    >
      {new Array(5).fill(0).map((_, i) => (
        <Item key={i} isLoading={true} />
      ))}
    </Carousel>
  </StyledDiv>
);

const TLCarousel = ({
  queryFn,
  Item,
  onClick,
  showIndicators = true,
  centerSlidePercentage = 80,
}: Props) => {
  const { data, isLoading } = queryFn();

  return (
    <StyledDiv>
      <Carousel
        showArrows={false}
        centerMode
        centerSlidePercentage={centerSlidePercentage}
        showStatus={false}
        autoPlay={false}
        infiniteLoop
        stopOnHover
        interval={5000}
        showThumbs={false}
        showIndicators={showIndicators}
      >
        {data.map((item) => (
          <Item
            key={item.id}
            isLoading={isLoading}
            item={item}
            onClick={() => onClick?.(item.id)}
          />
        ))}
      </Carousel>
    </StyledDiv>
  );
};

export default TLCarousel;
