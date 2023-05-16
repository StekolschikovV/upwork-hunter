import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { IJob } from "../Newtab/type";

export class FeedStore {

    root: RootStore;
    feed: IJob[] = [];
    feedList: string[] = [
        "https://www.upwork.com/ab/feed/jobs/rss?q=parsing&proposals=0-4%2C5-9&sort=recency&paging=0%3B50&api_params=1&securityToken=0812d678a5a00ac1e81801b34f5756f2b0ed725dd6b0b35318663c949562e7f1fafb97fba53dee79aaf98e6fc1d6c3ea3192e3987d2792d356ccfda86974a9be&userUid=673810824618057728&orgUid=673810824622252033",
        "https://www.upwork.com/ab/feed/jobs/rss?q=AWS&proposals=0-4%2C5-9&sort=recency&paging=0%3B50&api_params=1&securityToken=0812d678a5a00ac1e81801b34f5756f2b0ed725dd6b0b35318663c949562e7f1fafb97fba53dee79aaf98e6fc1d6c3ea3192e3987d2792d356ccfda86974a9be&userUid=673810824618057728&orgUid=673810824622252033"
    ]

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this)
        this.hydrate()
        this.getJobs()
    }

    getJobs = () => {
        console.log("getJobs")
        this.feedList.forEach(feedURL => {
            fetch(feedURL)
                .then(response => response.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => console.log(data))
        })
    }


    hydrate = () => {
    }

}
