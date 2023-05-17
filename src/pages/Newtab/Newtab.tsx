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
  console.log(JSON.parse(JSON.stringify(store.feedStore.feed)))
  const jobs: IJob[] = [
    // {
    //   time: new Date('Tue May 16 2023 04:50:00'),
    //   title: "Job 1",
    //   isFavorite: false,
    //   isRemoved: false
    // },
    // {
    //   time: new Date('Tue May 16 2023 04:35:45'),
    //   title: "job 2",
    //   isFavorite: false,
    //   isRemoved: false
    // }
  ]

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
                <SVG type='sort' onClickHandler={() => console.log("123")} cursorPointer={true} />
                <LeftTime />
                <Btn title="Refresh" onClick={e => console.log('==', e)} />
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
