import React from "react"
import { ReactNode } from "react"
import styles from "./styles.module.scss"

const ControlsContainer = (props: { children: ReactNode }) => {
  return <div className={styles.controlsContainer}>
    {props.children}
  </div>
}

export default ControlsContainer