import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {useRootStore} from "../../../providers/RootStoreProvider";
import Btn from "../../components/Btn";
import styles from "./style.module.scss";

const ChatGPT = observer(() => {

    const store = useRootStore()

    const tabs = ["Cover Letter", "Profile Summary", "Chat Response", "Generic Q&A"]

    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const [askText, setAskText] = useState<string | null>(null)
    const [answerText, setAnswerText] = useState<string | null>(null)

    useEffect(() => {
        setAskText(null)
        setAnswerText(null)
    }, [selectedTab])

    const getPlaceholder = () => {
        switch (selectedTab) {
            case "Cover Letter":
                return "Enter job description here"
            case "Profile Summary":
                return "Enter basic or draft description"
            case "Chat Response":
                return "Enter previous conversation here"
            case "Generic Q&A":
                return "Enter job description or question here"
            default:
                return "Enter here"
        }
    }

    const askHandler = async () => {
        // setAskText(null)
        setAnswerText("Loading...")
        const response = await store.chatGPTStore.ask(selectedTab, askText)
        response ? setAnswerText(`${response}`) : setAnswerText(null)
        console.log(response)
    }

    return <div className={styles.container}>
        <ul className={styles.tabs}>
            {tabs
                .map(t =>
                    <li
                        key={t}
                        className={`${styles.tab} ${selectedTab === t && styles.selectedTab}`}
                        onClick={e => setSelectedTab(t)}
                    >
                        {t}
                    </li>
                )}
        </ul>
        <div className={styles.content}>
            <textarea rows={20} value={`${askText || ""}`} onChange={e => setAskText(e.target.value)}
                      placeholder={getPlaceholder()}/>
        </div>
        {answerText && <pre className={styles.answerContent}>
            <div className={styles.answerTitle}>Answer:</div>
            {answerText}
        </pre>}
        <div className={styles.btnContent}>
            {(answerText && answerText !== "Loading...") &&
                <Btn title={"Regenerate"} color={"red"} onClick={askHandler}/>}
            {!answerText && <Btn title={"Generate"} onClick={askHandler}/>}
            {(answerText && answerText !== "Loading...") &&
                <Btn title={"Copy"} onClick={() => navigator.clipboard.writeText(answerText)}/>}
        </div>
    </div>

})

export default ChatGPT;