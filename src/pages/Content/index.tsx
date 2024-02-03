import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { IngredientIcon, MoneyIcon } from '@/assets';
import useStore from '@/stores';

import Comment from './components/Comment';
import Recipe, { Fallback as RecipeFallback } from './components/Recipe';

const StyledSection = styled.section`
  width: 100%;
  background:
    url('/home-guide-background.png'),
    lightgray 50% / cover no-repeat;
  display: flex;
  padding: 32px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  .img-container {
    width: 320px;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    border: 2px solid var(--Gray-90, #1c1c1c);
    background: var(--Gray-White, #fff);
    box-shadow: 4px 4px 0px 0px #1c1c1c;
    img {
      width: 124px;
      height: 124px;
      flex-shrink: 0;
    }
  }

  .text-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    .ip-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    .ingredient,
    .price {
      svg {
        cursor: default;
        border-radius: 0;
        &:hover {
          box-shadow: none;
        }
      }
      display: inline-flex;
      gap: 8px;
      align-items: center;
    }
  }
`;

const StyledBottomSection = styled.section`
  display: flex;
  padding: 24px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  .title {
    padding: 8px 0px;
  }
`;

const Content = () => {
  const { comboItemId: comboItemIdParam } = useParams();
  const comboItemId = Number(comboItemIdParam ?? 0);
  const { comboItemStore } = useStore();

  return (
    <>
      <StyledSection>
        <div className="img-container">
          {comboItemStore.selectedComboItem?.products.map((p) => (
            <img key={p.productId} src={p.imageUrl} alt={p.name} />
          ))}
        </div>
        <div className="text-container">
          <div className="headline01">
            {comboItemStore.selectedComboItem?.name}
          </div>
          <div className="ip-container">
            <div className="ingredient">
              <IngredientIcon />
              <span className="title03">
                {comboItemStore.selectedComboItem?.products
                  .map((p) => p.name)
                  .join(', ')}
              </span>
            </div>
            <div className="price">
              <MoneyIcon />
              <span className="title03">
                {`${comboItemStore.selectedComboItem?.products.reduce(
                  (acc, p) => acc + p.price,
                  0,
                )}원`}
              </span>
            </div>
          </div>
        </div>
      </StyledSection>
      <StyledBottomSection>
        <div className="recipe-title title02">레시피</div>
        <Suspense fallback={<RecipeFallback />}>
          <Recipe comboItemId={comboItemId} />
        </Suspense>
      </StyledBottomSection>
      <Suspense fallback={<div>Loading...</div>}>
        <Comment comboItemId={comboItemId} />
      </Suspense>
    </>
  );
};

export default observer(Content);
