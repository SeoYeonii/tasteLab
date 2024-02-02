import { faker } from '@faker-js/faker';

import { Product } from '@/interfaces/common';

const makeFakeProduct = (): Product => ({
  productId: faker.number.int({ min: 1, max: 10000 }),
  name: '불닭볶음면',
  imageUrl:
    'https://www.ministop.co.kr/MiniStopHomePage/page/pic.do?n=event2plus1.[MFEFCGJS_]2plus1_750.jpg',
  shopType: 'CU',
  price: faker.number.int({ min: 1000, max: 50000 }),
  productType: '라면',
  usedCount: faker.number.int({ min: 1, max: 1000 }),
  savedAt: faker.date.recent().toISOString(),
});

export default makeFakeProduct;
