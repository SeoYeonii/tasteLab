import { faker } from '@faker-js/faker';

import { RecommendItem } from '@/interfaces/home';

import makeFakeProduct from './makeFakeProduct';

const makeFakeRecommendItems = (num: number): RecommendItem[] =>
  new Array(num).fill(0).map(() => ({
    comboItemId: faker.number.int({ min: 1, max: 10000 }),
    ment: '오늘 하루 부스터를 달아줄 꿀+꿀 더블 조합',
    foods: [makeFakeProduct(), makeFakeProduct()],
    drinks: [makeFakeProduct(), makeFakeProduct()],
    foodsName: '마크정식',
    drinksName: '얼박사',
  }));

export default makeFakeRecommendItems;
