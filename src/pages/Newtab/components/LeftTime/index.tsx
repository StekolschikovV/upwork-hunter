import React from "react"
import styles from "./style.module.scss"
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../providers/RootStoreProvider";

const LeftTime = observer(() => {

  const store = useRootStore()

  const time = new Date(store.feedStore.refreshTimer * 1000).toLocaleTimeString([], {
    minute: "numeric",
    second: "2-digit",
  })

  return <div className={styles.leftTime}>{time}</div>

})

export default LeftTime