import React from "react"
import styles from "./style.module.scss"
import SVG from "../SVG"
import Moment from 'react-moment';
import { IJob } from "../../type";

interface IProps {
  job: IJob
}

const Job = ({ job }: IProps) => {

  const firstDate = new Date(job.date)
  const lastDate = new Date()
  const minAgo = Math.floor((lastDate.getTime() - firstDate.getTime()) / 60000)

  return <div className={styles.container}>
    <div className={styles.time}>
      <div className={styles.timeIn}>
        <Moment format="hh:mm">
          {job.date}
        </Moment>
      </div>
      <div className={styles.timeAgo}>

        {minAgo > 60 && <>over 60m</>}
        {minAgo < 60 && <>{minAgo}m ago</>}
      </div>
    </div>
    <div className={styles.title}>
      {job.title}
    </div>
    <div className={styles.controls}>
      <SVG type="star" cursorPointer={true} color="#D5E0D5" hoveColor="#FDCD81" />
    </div>
  </div>

}

export default Job