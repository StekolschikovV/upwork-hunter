import React, { ReactNode, useState } from 'react';
import Menu from './components/Menu'
import './Newtab.scss';
import Btn from './components/Btn';
import ControlsContainer from './components/ControlsContainer';
import LeftTime from './components/LeftTime';
import SVG from './components/SVG';
import Job, { IJob } from './components/Job';

const Newtab = () => {

  const [activePage, setActivePage] = useState("Feed")
  const jobs: IJob[] = [
    {
      time: new Date('July 1, 1999, 12:22:20'),
      title: "job 1",
      isFavorite: false,
      isRemoved: false
    },
    {
      time: new Date('July 1, 2023, 12:01:4'),
      title: "job 2",
      isFavorite: false,
      isRemoved: false
    }
  ]

  return (
    <div className="container">
      <header>
        <div className="header-title">UPWORK HUNTER</div>
      </header>
      <div className="content">
        <Menu onParentClickHandler={e => setActivePage(e)} />
        <div className="content-container">
          {activePage === "Feed" &&
            <>
              <ControlsContainer>
                <SVG type='sort' onClickHandler={() => console.log("123")} cursorPointer={true} />
                <LeftTime />
                <Btn title="Add task" onClick={e => console.log('==', e)} />
              </ControlsContainer>
              {jobs.map(e => <Job job={e} key={e.time + e.title} />)}
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Newtab;
