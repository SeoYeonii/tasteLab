import styled from 'styled-components';

type BadgeProps = {
  color: string;
};

const StyledBadge = styled.div<BadgeProps>`
  ${({ color }) => `background-color: ${color};`}
  border-radius: 100px;
  display: inline-flex;
  padding: 4px 8px;
  align-items: center;
`;

interface Props {
  color?: string;
  text: string;
}

const Badge = ({ color = 'var(--Yellow-20, #FFE18F)', text }: Props) => (
  <StyledBadge className="title04" color={color}>
    {text}
  </StyledBadge>
);

export default Badge;
