import React from "react"
import styles from "./style.module.scss"

interface IProps {
  title: string, 
  onClick: (title: string) => void
  type?: "small" | "normal" | "big",
  color?: "green" | "yellow" | "red"
}

const Btn = ({ title, onClick, type = "normal", color = "green" }: IProps) => {

  return <button
    className={`${styles.button} ${styles[type]} ${styles[color]}`}
    onClick={() => onClick(title)}>{title}</button>
    
}

export default Btn