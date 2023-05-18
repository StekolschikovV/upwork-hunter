import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useRootStore } from "../../../providers/RootStoreProvider";
import Btn from "../../components/Btn";
import ControlsContainer from "../../components/ControlsContainer";
import styles from "./style.module.scss";

const CoverLetter = observer(() => {

  const store = useRootStore()
  const [activeTab, setActiveTab] = useState("")
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  useEffect(() => {
    const targetCL = store
      .coverLetterStore
      .coverLetters
      .find(e => e.title === activeTab)
    setTitle(targetCL?.title || "")
    setText(targetCL?.text || "")
  }, [activeTab])

  const onChangeHandler = () => {
    const targetCL = store
      .coverLetterStore
      .coverLetters
      .find(e => e.title === activeTab)
    if (targetCL) {
      store.coverLetterStore.change(targetCL?.title, targetCL.text, title, text)
    }
  }

  const onDeleteHandler = () => {
    const targetCL = store
      .coverLetterStore
      .coverLetters
      .find(e => e.title === activeTab)
    if (targetCL) {
      store.coverLetterStore.delete(targetCL?.title, targetCL.text)
      setTitle("")
      setText("")
      setActiveTab("")
    }
  }

  return <div className={styles.container}>
    <ul className={styles.tabs}>
      <li className={activeTab === "" ? styles.selectedTab : null} onClick={() => setActiveTab("")}>+</li>
      {
        store.coverLetterStore.coverLetters.map(
          cl =>
            <li
              key={cl.text + cl.title}
              onClick={() => setActiveTab(cl.title)}
              className={activeTab === cl.title ? styles.selectedTab : null}>
              {cl.title}
            </li>
        )
      }
    </ul>
    <div className={styles.content}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" type="text" />
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Text" rows={30} />
    </div>
    <ControlsContainer>
      {!activeTab && <Btn title="Create" onClick={e => {
        store.coverLetterStore.add(title, text)
        setTitle("")
        setText("")
      }} />}
      {!!activeTab && <Btn title="Save" onClick={onChangeHandler} />}
      {!!activeTab && <Btn title="Delete" color="red" onClick={() => onDeleteHandler()} />}
    </ControlsContainer>
  </div>

})

export default CoverLetter;