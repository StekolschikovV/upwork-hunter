import { keys, makeAutoObservable } from "mobx";
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
    feedList: string[] = [
        "https://www.upwork.com/ab/feed/jobs/rss?q=parsing&proposals=0-4%2C5-9&sort=recency&paging=0%3B50&api_params=1&securityToken=0812d678a5a00ac1e81801b34f5756f2b0ed725dd6b0b35318663c949562e7f1fafb97fba53dee79aaf98e6fc1d6c3ea3192e3987d2792d356ccfda86974a9be&userUid=673810824618057728&orgUid=673810824622252033",
        "https://www.upwork.com/ab/feed/jobs/rss?q=AWS&proposals=0-4%2C5-9&sort=recency&paging=0%3B50&api_params=1&securityToken=0812d678a5a00ac1e81801b34f5756f2b0ed725dd6b0b35318663c949562e7f1fafb97fba53dee79aaf98e6fc1d6c3ea3192e3987d2792d356ccfda86974a9be&userUid=673810824618057728&orgUid=673810824622252033"
    ]

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this)
        this.getJobs()
        this.refresh()
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
                fetch(e).then(
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
                )))
        // @ts-ignore
        const result = data?.flat()?.sort((a: any, b: any) => Date.parse(new Date(a?.date)) - Date.parse(new Date(b?.date))).reverse()
        this.feed = result
        return result
    }

}
