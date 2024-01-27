import { ReactElement, useCallback } from 'react';

import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import useStore from '@/stores';

const StyledCounter = styled.div`
  display: flex;

  button {
    border: 1px solid #cccccc;
    box-sizing: border-box;
    width: 3rem;
    height: 2rem;
    font-weight: 900;
    font-size: 1rem;
    color: #666666;
    background-color: #eeeeee;
  }

  div {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #cccccc;
    border-right: 0;
    border-left: 0;
    width: 6rem;
    font-weight: 900;
    font-size: 1rem;
    color: #666666;
  }
`;

const Counter = (): ReactElement => {
  const { testStore } = useStore();

  const handleClickMinus = useCallback(() => {
    testStore.setCount(testStore.count - 1);
  }, [testStore]);

  const handleClickPlus = useCallback(() => {
    testStore.setCount(testStore.count + 1);
  }, [testStore]);

  return (
    <StyledCounter>
      <button type="button" onClick={handleClickMinus}>
        -
      </button>
      <div>{testStore.count}</div>
      <button type="button" onClick={handleClickPlus}>
        +
      </button>
    </StyledCounter>
  );
};

export default observer(Counter);
