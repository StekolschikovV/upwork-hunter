import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useRootStore } from "../../../providers/RootStoreProvider";
import styles from "./style.module.scss"
import Btn from "../../components/Btn";
import SVG from "../../components/SVG";

const Settings = observer(() => {

  const store = useRootStore()

  return (<>
    <div className={styles.line}>
      <div className={styles.lineTitle}>Check feed every second</div>
      <input
        className={styles.lineInput}
        value={store.feedStore.refreshTime}
        type="number"
        min="10"
        onChange={e => {
          store.feedStore.refreshTime = +e.target.value
          store.feedStore.refreshTimer = +e.target.value
        }}
      />
    </div>
    <div className={styles.line}>
      <div className={styles.lineTitle}>Number of job offers displayed</div>
      <input
        className={styles.lineInput}
        value={store.feedStore.showJobs}
        type="number"
        min="1"
        onChange={e => store.feedStore.showJobs = +e.target.value} />
    </div>
    <div className={styles.lineFeeds}>
      <div className={styles.lineTitle}>Feeds:</div>
      <div className={styles.feedsList}>
        {store.feedStore.feedList.map(f => {
          return <div className={styles.feedsLine}>
            <div className={styles.feedsText}>{f}</div>
            <SVG type="close" size="15" cursorPointer={true} />
          </div>
        })}
        <div className={styles.feedsLine}>
          <input
            placeholder="Insert RSS link"
            className={styles.feedsInput}
            type="text" />
          <Btn title={"Add"} type="small" onClick={() => { }} />
        </div>
      </div>
    </div>
  </>);
})

export default Settings;
