import styled from 'styled-components';

import { useGetListItems } from '@/apis';
import { HeartIcon } from '@/assets';
import Badge from '@/components/Badge';
import Skeleton from '@/components/Skeleton';

const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  .list-item {
    display: flex;
    gap: 16px;
    .img-container {
      width: 97px;
      height: 96px;
      flex-shrink: 0;
      background: var(--Gray-White, #fff);
      border-radius: 8px;
      border: 2px solid var(--Gray-90, #1c1c1c);
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .desc-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      .badge-row {
        display: inline-flex;
        justify-content: flex-start;
      }
      .name-row {
        display: inline-flex;
        width: 100%;
      }
      .tag-row {
        max-width: 170px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .heart-row {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        svg {
          width: 16px;
          height: 16px;
        }
        path {
          fill: #5f5f5f;
        }
        .like-num {
          color: var(--Gray-70, #5f5f5f);
        }
      }
    }
  }
`;

export const Fallback = () => (
  <StyledListContainer>
    {new Array(3).fill(0).map((_, index) => (
      <div key={`list-${index}`} className="list-item">
        <div className="img-container">
          <Skeleton height="100%" width="100%" />
        </div>
        <div className="desc-container">
          <div className="badge-row">
            <Badge text={`${index + 1}위`}></Badge>
          </div>
          <div className="name-row title02">
            <Skeleton width="5rem" height="1.2rem" />
          </div>
          <div className="tag-row">
            <Skeleton width="7rem" height="1rem" />
          </div>
          <div className="heart-row">
            <HeartIcon />
            <div className="like-num title04">
              <Skeleton height="1rem" width="3rem" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </StyledListContainer>
);

const TopList = () => {
  const { data } = useGetListItems();
  return (
    <StyledListContainer>
      {data?.map((item) => (
        <div key={item.id} className="list-item">
          <div className="img-container">
            <img src={item.imgUrl} alt={item.name} />
          </div>
          <div className="desc-container">
            <div className="badge-row">
              <Badge text={`${item.rank}위`}></Badge>
            </div>
            <div className="name-row title02">{item.name}</div>
            <div className="tag-row title04">{`#${item.tags.join(' #')}`}</div>
            <div className="heart-row">
              <HeartIcon />
              <div className="like-num title04">{item.likeNum}</div>
            </div>
          </div>
        </div>
      ))}
    </StyledListContainer>
  );
};
export default TopList;
