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

const Newtab = observer(() => {

  const [activePage, setActivePage] = useState("Feed")
  const store = useRootStore()

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
          {activePage === "Feed" &&
            <>
              <ControlsContainer>
                {/* <SVG type='sort' onClickHandler={() => console.log("123")} cursorPointer={true} /> */}
                <LeftTime />
                <Btn title="Refresh" onClick={e => store.feedStore.getJobs()} />
              </ControlsContainer>
              {store.feedStore.feed.map(e => <Job job={e} key={e.date + e.title} />)}
            </>
          }
        </div>
      </div>
    </div>
  </>);
})

export default Newtab;
