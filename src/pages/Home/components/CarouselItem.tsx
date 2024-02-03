/* eslint-disable no-unused-vars */
import styled from 'styled-components';

import { AddIcon } from '@/assets';
import Skeleton from '@/components/Skeleton';
import { ComboItem } from '@/interfaces/home';

const StyledCard = styled.div`
  display: flex;
  height: 280px;
  padding: 16px;
  flex-direction: column;
  border-radius: 16px;
  border: 2px solid #000;
  background: var(--Yellow-40, #ffc933);
  box-shadow: 4px 4px 0px 0px #000;
  margin: 0 6px;
  gap: 13px;

  &:hover {
    cursor: pointer;
  }

  .title-container {
    display: flex;
    padding: 16px 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 7px;
    align-self: stretch;
    border-radius: 8px;
    border: 2px solid var(--Gray-90, #1c1c1c);
    background: var(--Gray-White, #fff);

    .description {
      color: var(--Gray-70);
    }
  }

  .content-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .img-container {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      .img {
        width: 134px;
        height: 120px;
        border-radius: 16px;
        border: 2px solid var(--Gray-90, #1c1c1c);
        background: var(--Gray-White, #fff);
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
        }
      }
    }
    .text-container {
      display: inline-flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;

      svg {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

interface Props {
  item?: ComboItem;
  isLoading?: boolean;
  onClick?: (id: number) => void;
}

const CarouselItem = ({
  item = undefined,
  isLoading = false,
  onClick = undefined,
}: Props) => (
  <StyledCard onClick={() => onClick?.(item?.comboItemId ?? 0)}>
    <div className="title-container">
      {isLoading && <Skeleton height="1rem" />}
      {!isLoading && <div className="title title01">{item?.name ?? ''}</div>}
      {isLoading && <Skeleton height="1rem" />}
      {!isLoading && <div className="description title04">{item?.review}</div>}
    </div>
    <div className="content-container">
      <div className="img-container">
        <div className="img">
          {!isLoading && (
            <img
              src={item?.products[0]?.imageUrl}
              alt={item?.products[0]?.name}
            />
          )}
          {isLoading && <Skeleton height="80px" width="80px" />}
        </div>
        <div className="img">
          {!isLoading && (
            <img
              src={item?.products[1]?.imageUrl}
              alt={item?.products[1]?.name}
            />
          )}
          {isLoading && <Skeleton height="80px" width="80px" />}
        </div>
      </div>
      <div className="text-container">
        {!isLoading && (
          <div className="text title04">{item?.products[0]?.name}</div>
        )}
        {isLoading && <Skeleton height="1rem" width="5rem" />}
        <div>
          <AddIcon />
        </div>
        {!isLoading && (
          <div className="text title04">{item?.products[1]?.name}</div>
        )}
        {isLoading && <Skeleton height="1rem" width="5rem" />}
      </div>
    </div>
  </StyledCard>
);

export default CarouselItem;
