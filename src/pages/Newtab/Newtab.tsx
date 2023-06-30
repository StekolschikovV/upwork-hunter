import {observer} from "mobx-react-lite";
import 'moment-timezone';
import React, {useState} from 'react';
import './Newtab.scss';
import Menu from './components/Menu';
import CoverLetter from './screens/CoverLetter';
import Feed from './screens/Feed';
import Note from "./screens/Note";
import Settings from './screens/Settings';
import ChatGPT from "./screens/ChatGPT";

const Newtab = observer(() => {

    const [activePage, setActivePage] = useState("Feed")

    return (<>
        <div className="full-container">
            <header>
                <div className="header-title">UPWORK HUNTER</div>
            </header>
        </div>
        <div className="container">
            <div className="content">
                <Menu onParentClickHandler={e => setActivePage(e)}/>
                <div className="content-container">
                    {activePage === "Feed" && <Feed/>}
                    {activePage === "Cover Letter" && <CoverLetter/>}
                    {activePage === "Note" && <Note/>}
                    {activePage === "ChatGPT" && <ChatGPT/>}
                    {activePage === "Settings" && <Settings/>}
                </div>
            </div>
        </div>
        <div className="full-container">
            <footer>
                <div>Open Source, 2023</div>
                <ul>
                    <li><a href="https://github.com/StekolschikovV/upwork-hunter">GitHub</a></li>
                    <li><a href="mailto:upworkhunterextension@gmail.com">upworkhunterextension@gmail.com</a>
                    </li>
                </ul>
            </footer>
        </div>
    </>);
})

export default Newtab;
