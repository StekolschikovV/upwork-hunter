import React from 'react';
import './Newtab.scss';

const Newtab = () => {
  return (<>
    <div className="container">
      <header>
        <div className="header-title">UPWORK HUNTER</div>
      </header>
      <div className="content">
        <ul className="menu-container">
          <li className="menu-active-element">Feed</li>
          <li>Cover Letter</li>
          <li>ToDo</li>
          <li>Notes</li>
          <li>Settings</li>
        </ul>
        <div className="content-container">123</div>
      </div>
    </div>
  </>);
};

export default Newtab;
