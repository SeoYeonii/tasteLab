import styled from 'styled-components';

import { useGetRecipes } from '@/apis';
import Skeleton from '@/components/Skeleton';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .num {
    display: flex;
    width: 20px;
    height: 20px;
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 1000px;
    background: var(--Gray-90, #1c1c1c);
    color: var(--Gray-White, #fff);
    font-family: 'Pretendard Variable';
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
  }

  .text {
    color: var(--Gray-90, #1c1c1c);
    font-family: 'Pretendard Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
  }
`;

export const Fallback = () => (
  <>
    {new Array(3).fill(0).map((_, i) => (
      <StyledDiv key={i}>
        <div className="num">{i + 1}</div>
        <div className="text">
          <Skeleton width="15rem" height="1rem" />
        </div>
      </StyledDiv>
    ))}
  </>
);

interface Props {
  comboItemId: number;
}

const Recipe = ({ comboItemId }: Props) => {
  const { data } = useGetRecipes({ comboItemId });

  return (
    <>
      {data?.map((recipe) => (
        <StyledDiv key={recipe.orderNumber}>
          <div className="num">{recipe.orderNumber}</div>
          <div className="text">{recipe.description}</div>
        </StyledDiv>
      ))}
    </>
  );
};

export default Recipe;
