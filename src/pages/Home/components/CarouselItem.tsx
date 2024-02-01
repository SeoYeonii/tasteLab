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
  box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.25);
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
  comboItem?: ComboItem;
  isLoading?: boolean;
  onClick?: (id: string) => void;
}

const CarouselItem = ({
  comboItem = undefined,
  isLoading = false,
  onClick = undefined,
}: Props) => (
  <StyledCard onClick={() => onClick?.(comboItem?.id ?? '')}>
    <div className="title-container">
      {isLoading && <Skeleton height="1rem" />}
      {!isLoading && (
        <div className="title title01">{comboItem?.name ?? ''}</div>
      )}
      {isLoading && <Skeleton height="1rem" />}
      {!isLoading && (
        <div className="description title04">{comboItem?.description}</div>
      )}
    </div>
    <div className="content-container">
      <div className="img-container">
        <div className="img">
          {!isLoading && (
            <img
              src={comboItem?.product1.imgUrl}
              alt={comboItem?.product1.name}
            />
          )}
          {isLoading && <Skeleton height="80px" width="80px" />}
        </div>
        <div className="img">
          {!isLoading && (
            <img
              src={comboItem?.product2.imgUrl}
              alt={comboItem?.product2.name}
            />
          )}
          {isLoading && <Skeleton height="80px" width="80px" />}
        </div>
      </div>
      <div className="text-container">
        {!isLoading && (
          <div className="text title04">{comboItem?.product1.name}</div>
        )}
        {isLoading && <Skeleton height="1rem" width="5rem" />}
        <div>
          <AddIcon />
        </div>
        {!isLoading && (
          <div className="text title04">{comboItem?.product2.name}</div>
        )}
        {isLoading && <Skeleton height="1rem" width="5rem" />}
      </div>
    </div>
  </StyledCard>
);

export default CarouselItem;
