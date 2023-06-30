import { CoverLetterStore } from "./CoverLetterStore";
import { FeedStore } from "./FeedStore";
import { NoteStore } from "./NoteStore";
import {ChatGPTStore} from "./ChatGPTStore";

export type RootStoreHydration = {
    [key: string]: {
        hydrateFromLocalStore: () => void
    }
};

export class RootStore {

    feedStore: FeedStore;
    coverLetterStore: CoverLetterStore;
    noteStore: NoteStore;
    chatGPTStore: ChatGPTStore;

    constructor() {
        this.feedStore = new FeedStore(this);
        this.coverLetterStore = new CoverLetterStore(this);
        this.noteStore = new NoteStore(this);
        this.chatGPTStore = new ChatGPTStore(this);
    }

}
