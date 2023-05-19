import { CoverLetterStore } from "./CoverLetterStore";
import { FeedStore } from "./FeedStore";
import { NoteStore } from "./NoteStore";

export type RootStoreHydration = {
    [key: string]: {
        hydrateFromLocalStore: () => void
    }
};

export class RootStore {

    feedStore: FeedStore;
    coverLetterStore: CoverLetterStore;
    noteStore: NoteStore;

    constructor() {
        this.feedStore = new FeedStore(this);
        this.coverLetterStore = new CoverLetterStore(this);
        this.noteStore = new NoteStore(this);
    }

}
