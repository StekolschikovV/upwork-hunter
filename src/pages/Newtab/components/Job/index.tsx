import React from "react"
import styles from "./style.module.scss"
import SVG from "../SVG"

export interface IJob {
  time: Date,
  title: string,
  isFavorite: boolean,
  isRemoved: boolean
}

interface IProps {
  job: IJob
}

const Job = ({ job }: IProps) => {

  const time = () => {
    const min = job.time.getMinutes() !== 0 ? job.time.getMinutes() : `0` + job.time.getMinutes()
    const sec = job.time.getSeconds() !== 0 ? job.time.getSeconds() : `0` + job.time.getSeconds()
    return <>{min}:{sec}</>
  }

  return <div className={styles.container}>
    <div className={styles.time}>
      {time()}
    </div>
    <div className={styles.title}>
      {job.title}
    </div>
    <div className={styles.controls}>
      <SVG type="star" color="#D5E0D5" />
      <SVG type="bucket" color="#D5E0D5" />
    </div>
  </div>

}

export default Job