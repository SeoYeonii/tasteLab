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
      fill: var(--gray40) !important;
    }
    &:hover {
      cursor: pointer;
      color: var(--gray90);
    }
  }
`;

const StyledItem = styled.div`
  &.selected {
    color: var(--gray90);
    path {
      fill: var(--gray90) !important;
    }
    svg {
      display: none !important;
    }
    .hover-icon {
      display: block !important;
    }
  }
  &:hover {
    svg {
      display: none !important;
    }
  }
  &:hover {
    .hover-icon {
      display: block !important;
    }
    path {
      fill: var(--gray90) !important;
    }
  }
`;

interface FooterItemProps {
  selected: boolean;
  Icon: ElementType;
  IconFilled: ElementType;
  title: string;
  onClick: () => void;
}

const FooterItem = ({
  selected,
  Icon,
  IconFilled,
  title,
  onClick,
}: FooterItemProps) => (
  <StyledItem
    className={`${selected ? 'selected' : ''} item`}
    onClick={onClick}
  >
    <Icon className="icon" />
    <IconFilled className="icon hover-icon" style={{ display: 'none' }} />
    <div className="title04">{title}</div>
  </StyledItem>
);

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
      <FooterItem
        selected={pathname === PATH.HOME}
        Icon={HomeIcon as ElementType}
        IconFilled={HomeFilledIcon as ElementType}
        title="홈"
        onClick={() => hadleClickGoto(PATH.HOME)}
      />
      <FooterItem
        selected={pathname === PATH.LIST}
        Icon={ListIcon as ElementType}
        IconFilled={ListFilledIcon as ElementType}
        title="자료실"
        onClick={() => hadleClickGoto(PATH.LIST)}
      />
      <FooterItem
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
