import { makeAutoObservable } from 'mobx';

class TestStore {
  count: number;

  constructor() {
    this.count = 0;

    makeAutoObservable(this);
  }

  setCount(value: number) {
    this.count = value;
  }
}

export default TestStore;
