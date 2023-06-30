import {makeAutoObservable} from "mobx";
import {RootStore} from "./RootStore";
import axios from "axios";

export class ChatGPTStore {

    root: RootStore;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this)
    }

    ask = async (type: string, text: string | null) => {
        if (text === null) return false
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo', // Specify the model you want to use
                messages: this.getMessages(type, text)
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


}
