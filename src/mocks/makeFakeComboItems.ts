import { faker } from '@faker-js/faker';

import { ComboItem } from '@/interfaces/home';

const makeFakeComboItems = (): ComboItem[] =>
  new Array(5).fill(0).map(() => ({
    id: faker.string.uuid(),
    name: '불닭게티',
    description: '이 조합 무슨 말이 필요해!',
    product1: {
      id: faker.string.uuid(),
      name: '불닭볶음면',
      imgUrl:
        'https://www.ministop.co.kr/MiniStopHomePage/page/pic.do?n=event2plus1.[MFEFCGJS_]2plus1_750.jpg',
    },
    product2: {
      id: faker.string.uuid(),
      name: '불닭볶음면',
      imgUrl:
        'https://www.ministop.co.kr/MiniStopHomePage/page/pic.do?n=event2plus1.[MFEFCGJS_]2plus1_750.jpg',
    },
  }));

export default makeFakeComboItems;
