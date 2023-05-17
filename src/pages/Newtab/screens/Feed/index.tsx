import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useRootStore } from "../../../providers/RootStoreProvider";
import Btn from "../../components/Btn";
import ControlsContainer from "../../components/ControlsContainer";
import Job from "../../components/Job";
import LeftTime from "../../components/LeftTime";
import styles from "./style.module.scss"
const Feed = observer(() => {

  const store = useRootStore()

  return (<>
    {store.feedStore.feed.length > 0 && <ControlsContainer>
      {/* <SVG type='sort' onClickHandler={() => console.log("123")} cursorPointer={true} /> */}
      <LeftTime />
      <Btn title="Refresh" onClick={e => store.feedStore.getJobs()} />
    </ControlsContainer>}
    {store.feedStore.feed.splice(0, store.feedStore.showJobs).map((e, i) => <Job job={e} key={e.date + e.title + i} />)}

    {store.feedStore.feed.length === 0 && <div className={styles.error}>There are no feeds added, please specify the feeds you need in the settings section.</div>}
  </>);
})

export default Feed;
