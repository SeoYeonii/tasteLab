import { faker } from '@faker-js/faker';

import { RecommendItem } from '@/interfaces/home';

const makeFakeRecommendItems = (num: number): RecommendItem[] =>
  new Array(num).fill(0).map(() => ({
    id: faker.string.uuid(),
    ment: '오늘 하루 부스터를 달아줄 꿀+꿀 더블 조합',
    foods: [
      {
        id: faker.string.uuid(),
        name: '불닭볶음면',
        imgUrl:
          'https://www.ministop.co.kr/MiniStopHomePage/page/pic.do?n=event2plus1.[MFEFCGJS_]2plus1_750.jpg',
      },
      {
        id: faker.string.uuid(),
        name: '불닭볶음면',
        imgUrl:
          'https://www.ministop.co.kr/MiniStopHomePage/page/pic.do?n=event2plus1.[MFEFCGJS_]2plus1_750.jpg',
      },
    ],
    drinks: [
      {
        id: faker.string.uuid(),
        name: '불닭볶음면',
        imgUrl:
          'https://www.ministop.co.kr/MiniStopHomePage/page/pic.do?n=event2plus1.[MFEFCGJS_]2plus1_750.jpg',
      },
      {
        id: faker.string.uuid(),
        name: '불닭볶음면',
        imgUrl:
          'https://www.ministop.co.kr/MiniStopHomePage/page/pic.do?n=event2plus1.[MFEFCGJS_]2plus1_750.jpg',
      },
    ],
    foodsName: '마크정식',
    drinksName: '얼박사',
  }));

export default makeFakeRecommendItems;
