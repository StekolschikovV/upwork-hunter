import React from "react"
import styles from "./style.module.scss"

const Btn = ({ title, onClick }: { title: string, onClick: (title: string) => void }) => {

  return <button
    className={styles.button}
    onClick={() => onClick(title)}>{title}</button>
    
}

export default Btn