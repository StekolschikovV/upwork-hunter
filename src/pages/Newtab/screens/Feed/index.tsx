import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useRootStore } from "../../../providers/RootStoreProvider";
import Btn from "../../components/Btn";
import ControlsContainer from "../../components/ControlsContainer";
import Job from "../../components/Job";
import LeftTime from "../../components/LeftTime";
import SVG from "../../components/SVG";
import styles from "./style.module.scss";

const Feed = observer(() => {

  const [sortType, setSortType] = useState<"sort" | "reverse-sort">("sort")
  const [showLimitedJobs, setShowLimitedJobs] = useState<boolean>(true)

  const store = useRootStore()
  let feed = sortType === "sort" ? [...store.feedStore.feed] : [...store.feedStore.feed].reverse()
  feed = showLimitedJobs ? feed.splice(0, store.feedStore.showJobs) : feed

  return (<div className={styles.container}>
    {store.feedStore.feedList.length > 0 && <ControlsContainer padding={true}>
      {sortType === "sort" && <SVG type='sort' onClickHandler={() => setSortType("reverse-sort")} cursorPointer={true} />}
      {sortType === "reverse-sort" && <SVG type='reverse-sort' onClickHandler={() => setSortType("sort")} cursorPointer={true} />}
      <LeftTime />
      <Btn title="Refresh" onClick={e => store.feedStore.getJobs()} />
    </ControlsContainer>}
    {feed.map((e, i) => <Job job={e} key={i} />)}
    {feed.length > 0 && <>
      {showLimitedJobs && <button className={styles.showAllBtn} onClick={() => setShowLimitedJobs(false)}>Show all</button>}
      {!showLimitedJobs && <button className={styles.showAllBtn} onClick={() => setShowLimitedJobs(true)}>Show limited</button>}
    </>}
    {store.feedStore.feedList.length === 0 && <div className={styles.error}>There are no feeds added, please specify the feeds you need in the settings section.</div>}
    {store.feedStore.feedList.length > 0 && store.feedStore.feed.length === 0 && <div className={styles.error}>There are no new jobs yet.</div>}
  </div>)

})

export default Feed;
