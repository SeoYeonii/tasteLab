import { faker } from '@faker-js/faker';

export interface FakeData {
  id: string;
  profileImg?: string;
  name: string;
  description: string;
}

const makeFakeData = (): FakeData => ({
  id: faker.string.uuid(),
  profileImg: faker.datatype.boolean() ? faker.image.avatar() : undefined,
  name: faker.person.fullName(),
  description: faker.person.jobDescriptor(),
});

const makeFakeTestDatas = (num: number): FakeData[] =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Array(num).fill(0).map(() => makeFakeData());

export default makeFakeTestDatas;
