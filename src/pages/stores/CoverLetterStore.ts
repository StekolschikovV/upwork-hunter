import { makeAutoObservable, reaction } from "mobx";
import { RootStore } from "./RootStore";
import axios from "axios";

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
    this.coverLetters.push({ title, text })
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
    const { coverLetters } = await chrome.storage.sync.get(["coverLetters"]);
    this.coverLetters = coverLetters ? JSON.parse(coverLetters) : []
  }

  testChatGPT = async (jobDescription: string): Promise<any> => {
      try {
          const messages = [
              { role: 'system', content: 'You are a user looking for a job on Upwork.' },
              { role: 'user', content: `Job description: ${jobDescription}` },
              { role: 'assistant', content: 'Please generate a cover letter based on the job description.' },
          ];
          const response = await axios.post('https://api.openai.com/v1/chat/completions', {
              model: 'gpt-3.5-turbo', // Specify the model you want to use
              messages: messages

          }, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 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', // Замените YOUR_API_KEY на ваш ключ API
              },
          });
          return response.data.choices[0].message.content;
      } catch (error) {
          console.error(error);
          return false;
      }
  }

  test = async () => {
      const userInput = `I want to consult with a Bubble expert for 2h-3h in a google meet call.

WHY?
1) I'm aiming to build a simple mobile app (to upload on AppStore and Google Play) using Bubble.io.
2) I'm an experienced IT Leader and former developer and I want someone to accelerate my learning curve and walk me through the main hurdles of building a native app with Bubble, showing examples.
3) I want someone that can actually share screen and present previous Bubble Mobile App projects (during the call) explaining to me how they work...showing the functioning of workflows, api calls, queries, etc

The goal is to teach and clarify (during the call) the most important aspects of native mobile app development using Bubble, showcasing with real applications.`;
      const reply = await this.testChatGPT(userInput);
      console.log(reply);
  }


}
