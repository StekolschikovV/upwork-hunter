import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export class CoverLetterStore {

  root: RootStore;
  coverLetters: { title: string, text: string }[] = [
    {
      title: "Designer Cover Letter",
      text: "text"
    },
    {
      title: "Programmer Cover Letter",
      text: "text"
    }
  ]

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this)
  }

  add = (title: string, text: string) => {
    this.coverLetters.push({ title, text })
  }

  remove = (title: string, text: string) => {
    const newData = this.coverLetters.filter(e => e.title !== title && e.text !== text)
    this.coverLetters = newData
  }

  change = (title: string, text: string, newTitle: string, newText: string) => {
    const newData = this.coverLetters.map(e => {
      if(e.title === title && e.text === text){
        return {
          title: newTitle,
          text: newText
        }
      } else {
        return e
      }
    })
    this.coverLetters = newData
  }


}
