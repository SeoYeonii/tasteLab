import { faker } from '@faker-js/faker';

import { ComboItem } from '@/interfaces/home';

import makeFakeProduct from './makeFakeProduct';

const makeFakeComboItems = (): ComboItem[] =>
  new Array(5).fill(0).map(() => ({
    comboItemId: faker.number.int({ min: 1, max: 10000 }),
    name: '불닭게티',
    review: '이 조합 무슨 말이 필요해!',
    isGoodCount: faker.number.int({ min: 1, max: 1000 }),
    products: [makeFakeProduct(), makeFakeProduct()],
  }));

export default makeFakeComboItems;
