import React, { ReactNode } from "react"
import styles from "./styles.module.scss"

interface IProps {
  children: ReactNode,
  padding?: boolean
}

const ControlsContainer = ({ children, padding = false }: IProps) => {
  return <div className={`${styles.controlsContainer} ${padding ? styles.padding : null}`}>
    {children}
  </div>
}

export default ControlsContainer