import {makeAutoObservable, reaction, runInAction} from "mobx";
import xml2jsonES from 'xml2json-es';
import {IJob} from "../Newtab/type";
import {RootStore} from "./RootStore";

export class FeedStore {

    root: RootStore;
    feed: IJob[] = [];
    refreshTime = 80;
    refreshTimer = 80;
    showJobs = 30;
    feedList: string[] = []

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this)
        this.getJobs()
        this.refresh()
        this.load()
        reaction(
            () => [this.feed, this.refreshTime, this.showJobs, this.showJobs, this.feedList],
            () => {
                this.save()
            }
        )
    }

    refresh = () => {
        setInterval(() => {
            if (this.refreshTimer === 0) {
                this.refreshTimer = this.refreshTime
                this.getJobs()
            } else {
                this.refreshTimer = this.refreshTimer - 1
            }
        }, 1000)
    }

    getJobs = async (): Promise<IJob[]> => {
        let data = await Promise.all(
            this.feedList.map(e =>
                fetch(e)
                    .then(
                        response =>
                            response.text()
                                .then(text => new window.DOMParser().parseFromString(text, "text/html"))
                                .then(xml => xml2jsonES(xml, false))
                                .then((res: any) => {
                                    try {
                                        return res.content[1].content[1].content[0].content[0].content.filter((e: any) => e.type === "ITEM")
                                    } catch (e) {
                                        return []
                                    }
                                })
                                .then((items: any) => items?.map((e: any) => e?.content))
                                .then((items: any) => {
                                    return items?.map((e: any) => {
                                        let result = {}
                                        e.forEach((att: any) => {
                                            const type = att?.type
                                            const content = att?.content
                                            if (type && content) {
                                                // @ts-ignore
                                                // result[type?.toLowerCase()] = `${content[0]}`
                                                result[type?.toLowerCase()] = `${content[0]}`.replaceAll("- Upwork", "")
                                            }
                                            // @ts-ignore
                                            result.row = att
                                        });
                                        return result
                                    })
                                })
                                .then((items: any) => {
                                    return items.map((e: any) => {
                                        return {
                                            title: e?.title,
                                            date: e?.pubdate,
                                            link: e?.guid
                                        }
                                    })
                                })
                    )
                    .catch(e => {
                        console.log(e);
                        return []
                    })
            )
        )
        // @ts-ignore
        let result = data?.flat()?.sort((a: any, b: any) => Date.parse(new Date(a?.date)) - Date.parse(new Date(b?.date))).reverse()
        // remove duplicates 
        // @ts-ignore
        result = Array.from(new Set(result.map(JSON.stringify)), JSON.parse)
        runInAction(() => {
            this.feed = result
            this.save()
        })
        return result
    }

    addedFeed = (url: string) => {
        if ((url?.trim())?.length > 0) {
            this.feedList.push(url)
            this.getJobs()
        }
    }

    removeFeed = (url: string) => {
        this.feedList = this.feedList.filter(e => e !== url)
    }

    private save = async () => {
        await chrome.storage.sync.set({
            feed: `${JSON.stringify(this.feed.slice(0, 10))}`,
            feedList: `${JSON.stringify(this.feedList)}`,
            showJobs: `${this.showJobs}`,
            refreshTimer: `${this.refreshTimer}`,
            refreshTime: `${this.refreshTime}`,
        });
    }

    private load = async () => {
        const {feed, feedList, showJobs, refreshTimer} =
            await chrome.storage.sync.get(["feed", "feedList", "showJobs", "refreshTimer", "chatGPTKey"]);
        this.feed = feed ? JSON.parse(feed) : []
        this.feedList = feedList ? JSON.parse(feedList) : []
        this.refreshTimer = refreshTimer || 30
        this.showJobs = showJobs || 10
        this.getJobs()
    }

    private removeDuplicates = (arr: any[] = []) => {
        const map = new Map();
        arr.forEach((x) => map.set(JSON.stringify(x), x));
        arr = [...map.values()];
        return arr;
    }

}
