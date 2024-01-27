/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';

import styled from 'styled-components';

import { useGetFakeTestDatas } from '@/apis';
import Skeleton from '@components/Skeleton';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 20px;
  border: 1px solid #cccccc;
  width: fit-content;
  border-radius: 10px;
`;

const StyledItem = styled.div`
  padding: 20px;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  min-width: 12rem;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  .name-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    .name {
      font-weight: 900;
    }
  }
`;

export const Fallback = (): ReactElement => (
  <StyledDiv>
    <Skeleton num={3} width="18rem" height="6rem" />
  </StyledDiv>
);

const FakeDatas = (): ReactElement => {
  const { data } = useGetFakeTestDatas({ num: 10, awaitTime: 1000 });

  return (
    <StyledDiv>
      {data?.map((d: any) => (
        <StyledItem key={d.id}>
          <div className="name-container">
            {d.profileImg && <img src={d.profileImg}></img>}
            <div>
              <div className="name">{d.name}</div>
              <div className="desc">{d.description}</div>
            </div>
          </div>
        </StyledItem>
      ))}
    </StyledDiv>
  );
};

export default FakeDatas;
