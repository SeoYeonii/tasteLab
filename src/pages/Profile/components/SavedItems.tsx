/* eslint-disable operator-linebreak */
import styled from 'styled-components';

import { useGetSavedItems } from '@/apis';
import Skeleton from '@/components/Skeleton';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;

  .empty-text-container {
    padding-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    .empty-text {
      color: var(--Gray-60, #777);
      text-align: center;
    }
  }

  .saved-item-container {
    cursor: pointer;
    max-width: calc(33.33%);
    flex: 1 0 calc(33.33% - 16px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 12px;

    .saved-item {
      overflow: hidden;
      display: flex;
      width: 96px;
      height: 96px;

      border-radius: 16px;
      border: 2px solid var(--Gray-90, #1c1c1c);
      background: var(--Gray-White, #fff);
      img {
        width: 100%;
        height: 100%;
      }
    }

    .saved-item-name {
      margin-bottom: 24px;
    }
  }
`;

export const Fallback = () => (
  <StyledSection>
    {new Array(3).fill(0).map((_, i) => (
      <div className="saved-item-container" key={i}>
        <div className="saved-item">
          <Skeleton height="100%" width="100%" />
        </div>
        <div className="saved-item-name title02">
          <Skeleton height="1rem" width="3rem" />
        </div>
      </div>
    ))}
  </StyledSection>
);

const SavedItems = () => {
  const { data, fetchNextPage, hasNextPage } = useGetSavedItems();
  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <StyledSection>
      {(data?.result?.length ?? 0) === 0 && (
        <div className="empty-text-container">
          <div className="empty-text title02">찜 목록이 비어있어요!</div>
          <div className="empty-text title02">맘에 드는 꿀조합에</div>
          <div className="empty-text title02">하트를 눌러보세요:{'>'}</div>
        </div>
      )}
      {(data?.result?.length ?? 0) > 0 &&
        data?.result?.map((item) => (
          <div className="saved-item-container" key={item.comboItemId}>
            <div className="saved-item">
              <img
                src={item?.products?.[0]?.imageUrl}
                alt={item?.products?.[0]?.name}
              />
            </div>
            <div className="saved-item-name title02">{item.name}</div>
          </div>
        ))}
      <div ref={setTarget}></div>
    </StyledSection>
  );
};

export default SavedItems;
