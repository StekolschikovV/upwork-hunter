import React, { ReactNode, useState } from 'react';
import 'moment-timezone';
import Menu from './components/Menu'
import './Newtab.scss';
import Btn from './components/Btn';
import ControlsContainer from './components/ControlsContainer';
import LeftTime from './components/LeftTime';
import SVG from './components/SVG';
import Job from './components/Job';
import { IJob } from './type';
import { observer } from "mobx-react-lite";
import { useRootStore } from '../providers/RootStoreProvider';
import Feed from './screens/Feed';
import Settings from './screens/Settings';

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
        <Menu onParentClickHandler={e => setActivePage(e)} />
        <div className="content-container">
          {activePage === "Feed" && <Feed />}
          {activePage === "Settings" && <Settings />}
        </div>
      </div>
    </div>
  </>);
})

export default Newtab;
