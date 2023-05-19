import { makeAutoObservable, reaction } from "mobx";
import { RootStore } from "./RootStore";

export class NoteStore {

  root: RootStore;
  notes: { title: string, text: string }[] = []

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this)
    this.load()
    reaction(
      () => [this.notes],
      () => {
        this.save()
      }
    )
  }

  add = (title: string, text: string) => {
    this.notes.push({ title, text })
    this.save()
  }

  delete = (title: string, text: string) => {
    const newData = this.notes.filter(e => e.title !== title)
    this.notes = newData
    this.save()
  }

  change = (title: string, text: string, newTitle: string, newText: string) => {
    const newData = this.notes.map(e => {
      if (e.title === title && e.text === text) {
        return {
          title: newTitle,
          text: newText
        }
      } else {
        return e
      }
    })
    this.notes = newData
    this.save()
  }

  private save = async () => {
    await chrome.storage.sync.set({
      notes: JSON.stringify(this.notes)
    });
  }

  private load = async () => {
    const { notes } = await chrome.storage.sync.get(["notes"]);
    this.notes = notes ? JSON.parse(notes) : []
  }


}
