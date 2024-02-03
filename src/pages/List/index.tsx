import { MouseEvent, Suspense, useCallback, useState } from 'react';

import { Menu, MenuItem } from '@mui/material';
import { styled } from 'styled-components';

import { ArrowDownIcon, HeartIcon } from '@/assets';
import Badge from '@/components/Badge';
import Chip from '@/components/Chip';
import {
  ORDER_LABEL_MAP,
  OrderType,
  SORT_LABEL_MAP,
  SortType,
} from '@/interfaces/common';

import value from '../../svg.d';

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
      }
      .text-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 8px;
        flex-shrink: 0;
        align-self: stretch;

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

const StyledMenu = styled(Menu)`
  .MuiList-padding {
    padding: 0;
  }
  .MuiMenuItem-root {
    display: flex;
    width: 64px;
    height: 32px;
    padding: 9px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: var(--Gray-90, #1c1c1c);

    /* Body/Body03 */
    font-family: 'Pretendard Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 133.333% */
  }
`;

const List = () => {
  const [selectedSort, setSelectedSort] = useState<SortType>('A');
  const handleClickSort = useCallback((sort: SortType) => {
    setSelectedSort(sort);
  }, []);

  const [selectedOrder, setSelectedOrder] = useState<OrderType>('TOP');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (val: OrderType) => {
    setSelectedOrder(val);
    setAnchorEl(null);
  };

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
          <Suspense>
            <div className="list-header">
              <div>
                <span className="title03 black">50</span>
                <span className="title03 gray">건의 검색 결과</span>
              </div>
              <div className="drop-down" onClick={handleClickMenu}>
                <span className="title03 black">
                  {ORDER_LABEL_MAP[selectedOrder]}
                </span>
                <ArrowDownIcon />
              </div>
            </div>
            <div className="list-container">
              <div className="card">
                <div className="img">이미지</div>
                <div className="text-area">
                  <Badge text="음식" />
                  <div className="text-area">
                    <div className="title02">불닭게티</div>
                    <div className="title02">3200원</div>
                  </div>
                  <div className="like">
                    <HeartIcon />
                    <div className="title04">100</div>
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
        </div>
      </StyledSection>
      <StyledMenu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleCloseMenu('TOP')} divider>
          인기순
        </MenuItem>
        <MenuItem onClick={() => handleCloseMenu('NEW')} divider>
          최신순
        </MenuItem>
        <MenuItem onClick={() => handleCloseMenu('REPLY')}>댓글순</MenuItem>
      </StyledMenu>
    </>
  );
};

export default List;
