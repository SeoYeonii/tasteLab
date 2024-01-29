import { styled } from 'styled-components';

import { ArrowRightIcon } from '@/assets';

const StyledSection = styled.section`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 20px;

  .icon-container {
    display: flex;
  }
`;

interface Props {
  title: string;
  onClick?: () => void;
}

const NavTitle = ({ title, onClick }: Props) => (
  <StyledSection>
    <div className="title01">{title}</div>
    <div className="icon-container" onClick={onClick}>
      <ArrowRightIcon />
    </div>
  </StyledSection>
);

export default NavTitle;
