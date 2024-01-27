import { createContext, useContext } from 'react';

import TestStore from './TestStore';

interface Store {
  testStore: TestStore;
}

export const store: Store = {
  testStore: new TestStore(),
};

export const StoreContext = createContext(store);

const useStore = () => useContext(StoreContext);

export default useStore;
