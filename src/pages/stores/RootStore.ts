// import {AccountStore} from "stores/AccountStore";

// import {LangStore} from "stores/LangStore";
// import {CategoryStore} from "stores/Category";
// import {ToastStore} from "stores/ToastStore";

export type RootStoreHydration = {
    [key: string]: {
        hydrateFromLocalStore: () => void
    }
};

export class RootStore {
    // langStore: LangStore;
    // categoryStore: CategoryStore;
    // toastStore: ToastStore;

    constructor() {
        console.log('!!!');
        // this.langStore = new LangStore(this);
        // this.categoryStore = new CategoryStore(this);
        // this.toastStore = new ToastStore(this);
    }

    hydrateFromLocalStore = () => {
        // this.langStore.hydrateFromLocalStore()
        // this.categoryStore.hydrateFromLocalStore()
        // this.toastStore.hydrateFromLocalStore()
    }

    hydrate(data: RootStoreHydration) {
    }
}
