// eslint-disable-next-line object-curly-newline
import { Suspense, useCallback, useState } from 'react';

import { styled } from 'styled-components';

import Chip from '@/components/Chip';
import { SORT_LABEL_MAP, SortType } from '@/interfaces/common';

import Items from './Items';

const StyledSection = styled.section`
  padding: 32px 20px;
  display: flex;
  flex-direction: column;

  .sort-button-container {
    display: inline-flex;
    gap: 10px;
  }

  .list-header {
    display: flex;
    width: 100%;
    padding: 16px 0px;
    justify-content: space-between;
    align-items: center;
    .black {
      color: var(--gray90, #1c1c1c);
    }
    .gray {
      color: var(--gray70, #5f5f5f);
    }
    .drop-down {
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 4px;

      svg {
        width: 16px;
        height: 16px;
        &:hover {
          box-shadow: none;
        }
      }
    }
  }

  .list-container {
    padding: 0 0 28px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    .card {
      display: flex;
      width: 100%;
      align-items: flex-start;
      gap: 20px;

      .img {
        width: 180px;
        height: 120px;
        display: flex;
        padding: 12.068px 14px 8.667px 19px;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        border: 2px solid var(--Gray-90, #1c1c1c);
        background: var(--Gray-White, #fff);
        img {
          width: 90%;
          height: 90%;
        }
      }
      .text-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 8px;
        flex-shrink: 0;
        align-self: stretch;

        .text {
          max-width: 104px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .like {
          display: inline-flex;
          align-items: flex-start;
          gap: 4px;
          color: var(--gray70, #5f5f5f);
          svg {
            width: 16px;
            height: 16px;
            &:hover {
              box-shadow: none;
            }
            path {
              fill: var(--gray70, #5f5f5f) !important;
            }
          }
        }
      }
    }
  }
`;

const List = () => {
  const [selectedSort, setSelectedSort] = useState<SortType>('A');
  const handleClickSort = useCallback((sort: SortType) => {
    setSelectedSort(sort);
  }, []);

  return (
    <>
      <StyledSection>
        <div className="sort-button-container">
          {Object.keys(SORT_LABEL_MAP).map((k) => (
            <Chip
              key={k}
              selected={selectedSort === k}
              label={SORT_LABEL_MAP[k as SortType]}
              onClick={() => handleClickSort(k as SortType)}
            />
          ))}
        </div>
        <div className="list-container">
          <Suspense fallback={<div>Loading...</div>}>
            <Items sortType={selectedSort} />
          </Suspense>
        </div>
      </StyledSection>
    </>
  );
};

export default List;
