export const PATH_KEYS = ['HOME', 'TEST'] as const;
export type PathType = (typeof PATH_KEYS)[number];

// eslint-disable-next-line no-unused-vars
const PATH: { [key in PathType]: string } = {
  HOME: '/',
  TEST: '/test',
};

export default PATH;
