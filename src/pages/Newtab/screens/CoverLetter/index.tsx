import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styles from "./style.module.scss";

const CoverLetter = observer(() => {

  const [activeTab, setActiveTab] = useState("Designer Cover Letter");
  const [tabs, setTabs] = useState(["Designer Cover Letter", "Programmer Cover Letter"]);

  return <>
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
    <div>fields</div>
    <div>controls</div>
  </>

})

export default CoverLetter;