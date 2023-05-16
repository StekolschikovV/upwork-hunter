// import {AccountStore} from "stores/AccountStore";

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

    constructor() {
        console.log('!!!');
        this.feedStore = new FeedStore(this);
    }

    hydrateFromLocalStore = () => {
        // this.langStore.hydrateFromLocalStore()
        // this.categoryStore.hydrateFromLocalStore()
        // this.toastStore.hydrateFromLocalStore()
    }

    hydrate(data: RootStoreHydration) {
    }
}
