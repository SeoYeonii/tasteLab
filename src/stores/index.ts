import { createContext, useContext } from 'react';

import ComboItemStore from './ComboItemStore';
import TestStore from './TestStore';

interface Store {
  testStore: TestStore;
  comboItemStore: ComboItemStore;
}

export const store: Store = {
  testStore: new TestStore(),
  comboItemStore: new ComboItemStore(),
};

export const StoreContext = createContext(store);

const useStore = () => useContext(StoreContext);

export default useStore;
