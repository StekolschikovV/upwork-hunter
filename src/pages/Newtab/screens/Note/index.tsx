import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useRootStore } from "../../../providers/RootStoreProvider";
import Btn from "../../components/Btn";
import ControlsContainer from "../../components/ControlsContainer";
import styles from "./style.module.scss";

const Note = observer(() => {

  const store = useRootStore()
  const [activeTab, setActiveTab] = useState("")
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  useEffect(() => {
    const targetCL = store
      .noteStore
      .notes
      .find(e => e.title === activeTab)
    setTitle(targetCL?.title || "")
    setText(targetCL?.text || "")
  }, [activeTab])

  const onChangeHandler = () => {
    const targetCL = store
      .noteStore
      .notes
      .find(e => e.title === activeTab)
    if (targetCL) {
      store.noteStore.change(targetCL?.title, targetCL.text, title, text)
    }
  }

  const onDeleteHandler = () => {
    const targetCL = store
      .noteStore
      .notes
      .find(e => e.title === activeTab)
    if (targetCL) {
      store.noteStore.delete(targetCL?.title, targetCL.text)
      setTitle("")
      setText("")
      setActiveTab("")
    }
  }

  return <div className={styles.container}>
    <ul className={styles.tabs}>
      <li className={activeTab === "" ? styles.selectedTab : null} onClick={() => setActiveTab("")}>+</li>
      {
        store.noteStore.notes.map(
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
        store.noteStore.add(title, text)
        setTitle("")
        setText("")
      }} />}
      {!!activeTab && <Btn title="Save" onClick={onChangeHandler} />}
      {!!activeTab && <Btn title="Delete" color="red" onClick={() => onDeleteHandler()} />}
    </ControlsContainer>
  </div>

})

export default Note;