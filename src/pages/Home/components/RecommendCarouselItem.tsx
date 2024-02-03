/* eslint-disable no-unused-vars */
import styled from 'styled-components';

import { useGetRecommendItem } from '@/apis';
import { AddIcon } from '@/assets';
import Skeleton from '@/components/Skeleton';
import { ComboItem } from '@/interfaces/home';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 2px solid #000;
  box-shadow: 4px 4px 0px 0px #000;
  margin: 0 6px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }

  .title-container {
    background-color: #ffc933;
    display: inline-flex;
    width: 100%;
    height: 64px;
    padding: 12px 20px;
    justify-content: center;
    text-align: center;
    border-bottom: 2px solid #1c1c1c;
  }

  .content-container {
    display: flex;
    background-color: var(--white, #fff);
    padding: 16px;
    width: 100%;
    height: 100%;
    gap: 4px;
    justify-content: center;
    align-items: center;
    svg {
      &:hover {
        cursor: default;
        box-shadow: none;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 14px;
      .img {
        display: flex;
        border-radius: 20px;
        border: 2px solid #1c1c1c;
        background: var(--Gray-05, #f6f6f6);
        width: 128px;
        height: 128px;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
        align-items: center;

        .list {
          width: 100%;
          outline: none;
          display: block;
          position: relative;
          margin: 0;
          overflow: hidden;
        }
        ul {
          position: relative;
          list-style: none;
          width: 100%;
        }
        img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          position: absolute;
        }
        .img0 {
          left: 0;
        }
        .img1 {
          left: 58px;
        }
      }
    }
  }
`;

interface Props {
  isLoading?: boolean;
  onClick?: (comboItem: ComboItem) => void;
}

const RecommendCarouselItem = ({
  isLoading = false,
  onClick = undefined,
}: Props) => {
  const { data: item } = useGetRecommendItem();
  return (
    <StyledCard>
      <div className="title-container">
        {isLoading && <Skeleton height="1rem" />}
        {!isLoading && <div className="title02">{item?.ment ?? ''}</div>}
      </div>
      <div className="content-container">
        <div className="content" onClick={() => onClick?.(item.foodComboItem)}>
          <div className="img">
            {isLoading && <Skeleton height="100%" width="100%" />}
            {item?.foodComboItem.products.map((food, i) => (
              <img
                key={`img-${i}`}
                className={`img${i}`}
                src={food.imageUrl}
                alt={food.name}
              />
            ))}
          </div>
          {isLoading && <Skeleton height="18px%" width="3rem" />}
          {!isLoading && (
            <div className="name title03">{item?.foodComboItem.name}</div>
          )}
        </div>
        <div className="text">
          <AddIcon />
        </div>
        <div className="content" onClick={() => onClick?.(item.drinkComboItem)}>
          <div className="img">
            {isLoading && <Skeleton height="100%" width="100%" />}
            {item?.drinkComboItem.products.map((drink, i) => (
              <img
                className={`img${i}`}
                src={drink.imageUrl}
                alt={drink.name}
              />
            ))}
          </div>
          {isLoading && <Skeleton height="18px%" width="3rem" />}
          {!isLoading && (
            <div className="name title03">{item?.drinkComboItem.name}</div>
          )}
        </div>
      </div>
    </StyledCard>
  );
};

export default RecommendCarouselItem;
