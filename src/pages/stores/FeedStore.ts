import { action, keys, makeAutoObservable, makeObservable, observable, reaction, runInAction } from "mobx";
const axios = require('axios');
import { RootStore } from "./RootStore";
import { IJob } from "../Newtab/type";
import xml2jsonES from 'xml2json-es';



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
            () => [this.feed, this.refreshTime, this.refreshTimer, this.showJobs, this.feedList],
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
        console.log('+++', this.feedList, "+++");
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
                                                result[type?.toLowerCase()] = content[0]
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
        const result = data?.flat()?.sort((a: any, b: any) => Date.parse(new Date(a?.date)) - Date.parse(new Date(b?.date))).reverse()
        runInAction(() => {
            this.feed = result
        })

        return result
    }

    addedFeed = (url: string) => {
        this.feedList.push(url)
    }

    removeFeed = (url: string) => {
        console.log(url, this.feedList);
        this.feedList = this.feedList.filter(e => e !== url)
    }

    private save = () => {
        localStorage.setItem("refreshTime", `${this.refreshTime}`)
        localStorage.setItem("refreshTimer", `${this.refreshTimer}`)
        localStorage.setItem("showJobs", `${this.showJobs}`)
        localStorage.setItem("feedList", `${JSON.stringify(this.feedList)}`)
    }

    private load = () => {
        this.refreshTime = +`${localStorage.getItem("refreshTime")}` || 30
        this.refreshTimer = +`${localStorage.getItem("refreshTimer")}` || 30
        this.showJobs = +`${localStorage.getItem("showJobs")}` || 10
        const feedListStr = localStorage.getItem("feedList")
        if (feedListStr) {
            console.log('!!!', JSON.parse(feedListStr));
            this.feedList = JSON.parse(feedListStr)
        }
    }
}
