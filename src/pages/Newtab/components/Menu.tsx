import React, { useEffect, useState } from 'react';

interface IProps {
  onParentClickHandler: (title: string) => void
}

const Menu = ({ onParentClickHandler }: IProps) => {

  const elements = ["Feed", "Cover Letter", "ToDo", "Notes", "Settings"]
  const [active, setActive] = useState("Feed")

  const onClickHandler = (title: string) => {
    setActive(title)
    onParentClickHandler(title)
  }

  return <ul className="menu-container">
    {elements.map(e => <li
      key={e}
      className={active === e ? "menu-active-element" : ""}
      onClick={() => onClickHandler(e)}>
      {e}
    </li>)}
  </ul>

}

export default Menu