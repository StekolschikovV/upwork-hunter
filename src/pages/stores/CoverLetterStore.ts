import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export class FeedStore {

  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this)
  }

}
