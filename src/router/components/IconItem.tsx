import { ElementType } from 'react';

import { styled } from 'styled-components';

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

interface IconItemProps {
  selected?: boolean;
  Icon: ElementType;
  IconFilled: ElementType;
  title?: string;
  onClick: () => void;
}

const IconItem = ({
  selected = false,
  Icon,
  IconFilled,
  title = undefined,
  onClick,
}: IconItemProps) => (
  <StyledItem
    className={`${selected ? 'selected' : ''} item`}
    onClick={onClick}
  >
    <Icon className="icon" />
    <IconFilled className="icon hover-icon" style={{ display: 'none' }} />
    {title && <div className="title04">{title}</div>}
  </StyledItem>
);

export default IconItem;
