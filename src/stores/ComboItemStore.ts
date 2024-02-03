import { makeAutoObservable } from 'mobx';

import { ComboItem } from '@/interfaces/home';

class ComboItemStore {
  selectedComboItem: ComboItem | null;

  constructor() {
    this.selectedComboItem = null;

    makeAutoObservable(this);
  }

  setSelectedComboItem(value: ComboItem) {
    this.selectedComboItem = value;
  }
}

export default ComboItemStore;
