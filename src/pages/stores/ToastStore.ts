import {RootStore} from "stores/RootStore";
import {makeAutoObservable} from "mobx";

export class ToastStore {

    root: RootStore;
    toasts: {
        label: string
        body: string
    }[] = []

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this)
        setTimeout(() => {
            this.shift()
        }, 5000)
    }

    push = (toast: {
        label: string
        body: string
    }) => {
        this.toasts.push(toast)
    }

    shift = () => {
        this.toasts.shift()
    }

    removeByIndex = (index: number) => {
        try {
            this.toasts = this.toasts.slice(0, index).concat(this.toasts.slice(index + 1,))
        } catch (e) {
        }
    }

    hydrateFromLocalStore = () => {

    }

    hydrate = (data: string) => {

    }

}
