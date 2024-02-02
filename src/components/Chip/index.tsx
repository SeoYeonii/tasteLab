import { styled } from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  padding: 8px 14px 8px 12px;
  align-items: center;
  border-radius: 100px;
  border: 2px solid var(--Gray-90, #1c1c1c);
  background: var(--Flowkit-White, #fff);
  cursor: pointer;
  &:hover {
    background: var(--Yellow-40, #ffc933);
  }

  &.selected {
    background: var(--Yellow-40, #ffc933);
  }
`;

interface Props {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

const Chip = ({ label, selected = false, onClick }: Props) => (
  <StyledDiv
    className={`title03 ${selected ? 'selected' : ''}`}
    onClick={onClick}
  >
    {label}
  </StyledDiv>
);

export default Chip;
