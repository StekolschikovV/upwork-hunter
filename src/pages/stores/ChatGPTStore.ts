import {makeAutoObservable, reaction} from "mobx";
import {RootStore} from "./RootStore";
import axios from "axios";
import {toast} from "react-toastify";

export class ChatGPTStore {

    root: RootStore;
    key: string | null = null

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this)
        this.load()
        reaction(
            () => [this.key],
            () => {
                this.save()
            }
        )
    }

    ask = async (type: string, text: string | null) => {
        if (this.key === null) {
            toast("ChatGPT key is not specified!")
            return false
        }
        if (text === null) {
            toast("The text is not specified!")
            return false
        }
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo', // Specify the model you want to use
                messages: this.getMessages(type, text)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.key}`,
                },
            });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error(error);
            toast(`Check your ChatGPT key and internet connection.`)
            return false;
        }
    }

    private getMessages = (type: string, text: string): { role: string; content: string }[] => {
        switch (type) {
            case "Cover Letter":
                return [
                    {role: 'system', content: 'You are a user looking for a job on Upwork.'},
                    {role: 'user', content: `Job description: ${text}`},
                    {role: 'assistant', content: 'Please generate a cover letter based on the job description.'}
                ]
            case "Profile Summary":
                return [
                    {role: 'system', content: 'You are a user looking for a job on Upwork.'},
                    {role: 'user', content: `Job description: ${text}`},
                    {role: 'assistant', content: 'Please generate a profile summary based on the job description.'},
                ]
            case "Chat Response":
                return [
                    {role: 'system', content: 'You are a user looking for a job on Upwork.'},
                    {role: 'user', content: `Chat log: ${text}`},
                    {
                        role: 'assistant',
                        content: 'Please generate a next message that the job seeker should send based on the text of the chat.'
                    },

                ]
            case "Generic Q&A":
                return [{role: 'system', content: 'You are a user'}, {role: 'user', content: type}]
            default:
                return []
        }
    }

    private save = async () => {
        await chrome.storage.sync.set({
            key: `${this.key}`,
        });
    }

    private load = async () => {
        const {key} = await chrome.storage.sync.get(["key"]);
        this.key = key || null
    }
}
