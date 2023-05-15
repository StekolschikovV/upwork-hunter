import React, { ReactNode } from 'react';
import Menu from './components/Menu'
import './Newtab.scss';
import Btn from './components/Btn';

const ControlsContainer = (props: { children: ReactNode }) => {
  return <div className="controls-container">
    {props.children}
  </div>
}


const Newtab = () => {
  return (
    <div className="container">
      <header>
        <div className="header-title">UPWORK HUNTER</div>
      </header>
      <div className="content">
        <Menu />
        <div className="content-container">
          <ControlsContainer>
            <Btn title="Add task" onClick={e => console.log('==', e)} />
            <Btn title="Add task" onClick={e => console.log('==', e)} />
            <Btn title="Add task" onClick={e => console.log('==', e)} />
            <Btn title="Add task" onClick={e => console.log('==', e)} />
          </ControlsContainer>
        </div>
      </div>
    </div>
  );
};

export default Newtab;
