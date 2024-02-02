export const PATH_KEYS = [
  'HOME',
  'TEST',
  'LOGIN',
  'MAIN',
  'CONTENT',
  'LIST',
  'USERCONTENT',
  'REGISTER',
  'PROFILE',
] as const;
export type PathType = (typeof PATH_KEYS)[number];

// eslint-disable-next-line no-unused-vars
const PATH: { [key in PathType]: string } = {
  HOME: '/',
  LOGIN: '/login',
  MAIN: '/main',
  CONTENT: '/content/:comboItemId',
  LIST: '/list',
  USERCONTENT: '/usercontent',
  REGISTER: '/register',
  PROFILE: '/profile',
  TEST: '/test',
};

export default PATH;
