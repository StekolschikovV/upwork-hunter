import { observer } from "mobx-react-lite";
import 'moment-timezone';
import React, { useState } from 'react';
import './Newtab.scss';
import Menu from './components/Menu';
import CoverLetter from './screens/CoverLetter';
import Feed from './screens/Feed';
import Settings from './screens/Settings';

const Newtab = observer(() => {

  const [activePage, setActivePage] = useState("Cover Letter")

  return (<>
    <div className="full-container">
      <header>
        <div className="header-title">UPWORK HUNTER</div>
      </header>
    </div>
    <div className="container">
      <div className="content">
        <Menu onParentClickHandler={e => setActivePage(e)} />
        <div className="content-container">
          {activePage === "Feed" && <Feed />}
          {activePage === "Cover Letter" && <CoverLetter />}
          {activePage === "Settings" && <Settings />}
        </div>
      </div>
    </div>
  </>);
})

export default Newtab;
