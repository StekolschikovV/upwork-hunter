import React from "react"
import styles from "./style.module.scss"

interface IProps {
  title: string, 
  onClick: (title: string) => void
  type?: "small" | "normal" | "big"
}

const Btn = ({ title, onClick, type = "normal" }: IProps) => {

  return <button
    className={`${styles.button} ${styles[type]}`}
    onClick={() => onClick(title)}>{title}</button>
    
}

export default Btn