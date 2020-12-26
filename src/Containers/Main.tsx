import { useState } from 'react'
import data from '../Data/nations.json'
import Sidebar from '../Components/Navigation/Sidebar/Sidebar'
import { Info, Settings, Gapminder, User } from './Views'

import classes from './Main.module.scss'

const Main = (): JSX.Element => {
  const [viewSelected, setViewSelected] = useState('Chart')

  const onSidebarIconClicked = (name: string) => {
    setViewSelected(name)
  }

  return (
    <div className={classes.Main}>
      <Sidebar viewSelected={viewSelected} iconClicked={onSidebarIconClicked} />
      <h1 className={classes.Title}>{viewSelected}</h1>
      <Gapminder open={viewSelected === 'Chart'} data={data} />
      <Settings open={viewSelected === 'Settings'} disabled />
      <Info open={viewSelected === 'Help'} />
      <User open={viewSelected === 'User'} />
    </div>
  )
}

export default Main
