import React, { useEffect, useState } from 'react';

const Menu = () => {

  const elements = ["Feed", "Cover Letter", "ToDo", "Notes", "Settings"]
  const [active, setActive] = useState(elements[0] ?? "")

  return <ul className="menu-container">
    {elements.map(e => <li className={active === e ? "menu-active-element" : ""} onClick={() => setActive(e)}>{e}</li>)}
  </ul>

}

export default Menu