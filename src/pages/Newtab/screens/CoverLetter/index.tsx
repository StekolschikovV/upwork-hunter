import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import Btn from "../../components/Btn";
import ControlsContainer from "../../components/ControlsContainer";
import styles from "./style.module.scss";

const CoverLetter = observer(() => {

  const [activeTab, setActiveTab] = useState("Designer Cover Letter");
  const [tabs, setTabs] = useState(["Designer Cover Letter", "Programmer Cover Letter"]);

  return <div className={styles.container}>
    <ul className={styles.tabs}>
      <li onClick={() => setActiveTab("")}>+</li>
      {
        tabs.map(
          tab =>
            <li
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? styles.selectedTab : null}>
              {tab}
            </li>
        )
      }
    </ul>
    <div className={styles.content}>
      <input placeholder="Title" type="text" />
      <textarea placeholder="Description" rows={30} />
    </div>
    <ControlsContainer>
      <Btn title="Create" onClick={e => { }} />
      <Btn title="Save" onClick={e => { }} />
      <Btn title="Delete" onClick={e => { }} />
    </ControlsContainer>
  </div>

})

export default CoverLetter;