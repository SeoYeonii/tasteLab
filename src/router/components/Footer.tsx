import { ElementType, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import {
  HomeFilledIcon,
  HomeIcon,
  ListFilledIcon,
  ListIcon,
  PersonFilledIcon,
  PersonIcon,
} from '@/assets';

import IconItem from './IconItem';
import PATH from '../PATH';

const StyledFooter = styled.section`
  position: sticky;
  bottom: 0;
  height: 64px;
  border-top: 2px solid var(--Gray-90, #1c1c1c);
  background: #fff;
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: var(--gray40);
    flex: 1;
    height: 100%;
    justify-content: center;

    svg {
      box-shadow: none;
      border-radius: 0;
    }
    path {
      fill: var(--gray40);
    }
    &:hover {
      cursor: pointer;
      color: var(--gray90);
    }
  }
`;

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const hadleClickGoto = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );
  return (
    <StyledFooter>
      <IconItem
        selected={pathname === PATH.HOME}
        Icon={HomeIcon as ElementType}
        IconFilled={HomeFilledIcon as ElementType}
        title="홈"
        onClick={() => hadleClickGoto(PATH.HOME)}
      />
      <IconItem
        selected={pathname === PATH.LIST}
        Icon={ListIcon as ElementType}
        IconFilled={ListFilledIcon as ElementType}
        title="자료실"
        onClick={() => hadleClickGoto(PATH.LIST)}
      />
      <IconItem
        selected={pathname === PATH.PROFILE}
        Icon={PersonIcon as ElementType}
        IconFilled={PersonFilledIcon as ElementType}
        title="마이페이지"
        onClick={() => hadleClickGoto(PATH.PROFILE)}
      />
    </StyledFooter>
  );
};

export default Footer;
