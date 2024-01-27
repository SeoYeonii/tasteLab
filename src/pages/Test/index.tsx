import { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import useStore from '@/stores';

import Counter from './Counter';

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;

  section {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    .title {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .text {
      display: inline-flex;
      gap: 1rem;
      font-size: 1rem;
    }
  }

  #container {
    border: 1px solid red;
  }

  #counter {
    border: 1px solid yellow;
  }
`;

const Test = (): ReactElement => {
  const { testStore } = useStore();

  return (
    <StyledDiv>
      <section id="container">
        <div className="title">This is parent Component(Store test)</div>
        <div className="text">
          The Counter value is: <div>{testStore.count}</div>
        </div>
        <section id="counter">
          <div className="title">This is Counter Component</div>
          <Counter />
        </section>
      </section>
    </StyledDiv>
  );
};

export default observer(Test);
