import {makeAutoObservable, reaction} from "mobx";
import {RootStore} from "./RootStore";

export class CoverLetterStore {

    root: RootStore;
    coverLetters: { title: string, text: string }[] = []

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this)
        this.load()
        reaction(
            () => [this.coverLetters],
            () => {
                this.save()
            }
        )
    }

    add = (title: string, text: string) => {
        this.coverLetters.push({title, text})
        this.save()
    }

    delete = (title: string, text: string) => {
        const newData = this.coverLetters.filter(e => e.title !== title)
        this.coverLetters = newData
        this.save()
    }

    change = (title: string, text: string, newTitle: string, newText: string) => {
        const newData = this.coverLetters.map(e => {
            if (e.title === title && e.text === text) {
                return {
                    title: newTitle,
                    text: newText
                }
            } else {
                return e
            }
        })
        this.coverLetters = newData
        this.save()
    }

    private save = async () => {
        await chrome.storage.sync.set({
            coverLetters: JSON.stringify(this.coverLetters)
        });
    }

    private load = async () => {
        const {coverLetters} = await chrome.storage.sync.get(["coverLetters"]);
        this.coverLetters = coverLetters ? JSON.parse(coverLetters) : []
    }

}
