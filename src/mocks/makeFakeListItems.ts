import { faker } from '@faker-js/faker';

import { ListItem } from '@/interfaces/home';

const makeFakeListItems = (): ListItem[] =>
  new Array(3).fill(0).map((_, i) => ({
    id: faker.string.uuid(),
    imgUrl:
      'https://www.ministop.co.kr/MiniStopHomePage/page/pic.do?n=event2plus1.[MFEFCGJS_]2plus1_750.jpg',
    rank: i + 1,
    name: '불닭볶음면',
    tags: ['불닭게티', '마크정식', '불닭보나라'],
    likeNum: faker.number.int({ min: 0, max: 10000 }),
  }));

export default makeFakeListItems;
