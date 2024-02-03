import { MouseEvent, useState } from 'react';

import { Menu, MenuItem } from '@mui/material';
import { styled } from 'styled-components';

import { useGetList } from '@/apis';
import { ArrowDownIcon, HeartIcon } from '@/assets';
import Badge from '@/components/Badge';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { ORDER_LABEL_MAP, OrderType, SortType } from '@/interfaces/common';

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

interface Props {
  sortType: SortType;
}

const Items = ({ sortType }: Props) => {
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
  const { data, fetchNextPage, hasNextPage } = useGetList({
    orderType: selectedOrder,
    sortType,
  });
  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });
  return (
    <>
      <div className="list-header">
        <div>
          <span className="title03 black">{data.pageInfo.totalItemCount}</span>
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
        {data?.result.map((item) => (
          <div className="card" key={item.comboItemId}>
            <div className="img">
              <img src={item.products?.[0].imageUrl} alt={item.name} />
              <img src={item.products?.[1].imageUrl} alt={item.name} />
            </div>
            <div className="text-area">
              <Badge text="음식" />
              <div className="text-area">
                <div className="text title02">{item.name}</div>
                <div className="title02">{`${item.products.reduce((acc, cur) => acc + cur.price, 0)}원`}</div>
              </div>
              <div className="like">
                <HeartIcon />
                <div className="title04">{item.isGoodCount}</div>
              </div>
            </div>
          </div>
        ))}
        <div ref={setTarget} />
      </div>
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

export default Items;
