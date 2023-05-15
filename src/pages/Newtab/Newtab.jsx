import React from 'react';
import Menu from './components/Menu'
import './Newtab.scss';

const ControlsContainer = (props) => {
  return <div className="controls-container">
    {props.children}
  </div>
}
const Btn = ({ title, onClick }) => {
  return <button onClick={() => onClick(title)}>{title}</button>
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
