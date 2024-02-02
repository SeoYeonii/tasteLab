import styled from 'styled-components';

type BadgeProps = {
  bgcolor: string;
};

const StyledBadge = styled.div<BadgeProps>`
  ${({ bgcolor }) => `background-color: ${bgcolor};`}
  border-radius: 100px;
  display: inline-flex;
  padding: 4px 8px;
  align-items: center;
`;

interface Props {
  bgcolor?: string;
  text: string;
}

const Badge = ({ bgcolor = 'var(--Yellow-20, #FFE18F)', text }: Props) => (
  <StyledBadge className="title04" bgcolor={bgcolor}>
    {text}
  </StyledBadge>
);

export default Badge;
