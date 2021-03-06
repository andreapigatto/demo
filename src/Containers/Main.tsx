import { useState, useEffect } from 'react'

import Sidebar from '../Components/Navigation/Sidebar/Sidebar'
import Header from './Header/Header'
import { Info, Settings, MainView, User } from './Views'

import data from '../Data/nations.json'
import classes from './Main.module.scss'

const Main = (): JSX.Element => {
  const [viewSelected, setViewSelected] = useState('Chart')
  const [fieldsSelected, setFieldsSelected] = useState<Record<string, string>>(
    {}
  )

  useEffect(() => {
    setFieldsSelected({
      dimension: 'country',
      time: 'time',
      category: 'region',
      xAxis: 'income',
      yAxis: 'lifeExpectancy',
      color: 'region',
      size: 'population',
    })
  }, [])

  const onSidebarIconClicked = (name: string) => {
    setViewSelected(name)
  }

  const onSetFieldsSelected = (field: string, value: string) => {
    setFieldsSelected({
      ...fieldsSelected,
      [field]: value,
    })
  }

  return (
    <div className={classes.Main}>
      <Sidebar viewSelected={viewSelected} iconClicked={onSidebarIconClicked} />
      <Header viewSelected={viewSelected} />
      <MainView
        open={viewSelected === 'Chart'}
        data={data}
        fieldsSelected={fieldsSelected}
        setFieldsSelected={onSetFieldsSelected}
      />
      <Settings
        open={viewSelected === 'Settings'}
        fieldsSelected={fieldsSelected}
        setFieldsSelected={onSetFieldsSelected}
      />
      <Info open={viewSelected === 'Help'} />
      <User open={viewSelected === 'User'} />
    </div>
  )
}

export default Main
