import styled from 'styled-components';

const StyledAppbar = styled.section`
  width: 100%;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #f6f6f6;

  .left {
  }

  .right {
    svg {
      border-radius: 50%;
      &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px var(--yellow50);
      }
    }
  }
`;

export default StyledAppbar;
