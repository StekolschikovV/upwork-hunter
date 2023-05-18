// import {AccountStore} from "stores/AccountStore";

import { CoverLetterStore } from "./CoverLetterStore";
import { FeedStore } from "./FeedStore";

// import {LangStore} from "stores/LangStore";
// import {CategoryStore} from "stores/Category";
// import {ToastStore} from "stores/ToastStore";

export type RootStoreHydration = {
    [key: string]: {
        hydrateFromLocalStore: () => void
    }
};

export class RootStore {

    feedStore: FeedStore;
    coverLetterStore: CoverLetterStore;

    constructor() {
        this.feedStore = new FeedStore(this);
        this.coverLetterStore = new CoverLetterStore(this);
    }
    
}
