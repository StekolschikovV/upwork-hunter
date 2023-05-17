import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useRootStore } from "../../../providers/RootStoreProvider";
import styles from "./style.module.scss"

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
  </>);
})

export default Settings;
