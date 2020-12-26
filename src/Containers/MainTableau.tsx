import { useState, useEffect, SyntheticEvent } from 'react'

// eslint-disable-next-line import/no-unresolved
import { Worksheet, DataTable } from '@tableau/extensions-api-types'
import { Data } from '../types'

// eslint-disable-next-line import/named
import { getWorkSheetData, getColumns } from '../Tableau'
import Sidebar from '../Components/Navigation/Sidebar/Sidebar'
import { Gapminder, Info, Settings, User } from './Views'

import classes from './Main.module.scss'

type ComponentProps = {
  worksheets: Worksheet[]
}

const Main = ({ worksheets }: ComponentProps) => {
  const [worksheetSelected, setWorksheetSelected] = useState<string | null>(
    null
  )
  const [fieldsSelected, setFieldsSelected] = useState<Record<string, string>>(
    {}
  )
  const [tableauData, setTableauData] = useState<DataTable | null>(null)
  const [tableauFields, setTableauFields] = useState<Record<
    string,
    string
  > | null>(null)
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [chartData, setChartData] = useState<Data | null>(null)
  const [viewSelected, setViewSelected] = useState('Chart')

  useEffect(() => {
    if (worksheetSelected) {
      // Create a scoped async function in the hook
      const asnycFunc = async () => {
        const workbook = worksheets.find(
          (work) => work.name === worksheetSelected
        )
        if (workbook) {
          const data = await getWorkSheetData(workbook)
          if (data) {
            setTableauFields(getColumns(data))
            setTableauData(data)
          }
        }
      }
      asnycFunc()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worksheetSelected])

  useEffect(() => {
    if (settingsSaved) {
      if (tableauData) {
        // setChartData(getHierarchy(tableauData))
        setViewSelected('Chart')
      }
      setSettingsSaved(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsSaved])

  const onSidebarIconClicked = (name: string) => {
    setViewSelected(name)
  }

  const onSetWorkbook = (work: string) => {
    setWorksheetSelected(work)
  }

  const onSettingsSaved = () => {
    setSettingsSaved(true)
  }

  const onSetFieldsSelected = (
    field: string,
    event: SyntheticEvent<HTMLElement, Event>
  ) => {
    // console.log('EVENT', event.target)
    setFieldsSelected({
      ...fieldsSelected,
    })
  }

  return (
    <div className={classes.Main}>
      <Sidebar viewSelected={viewSelected} iconClicked={onSidebarIconClicked} />
      <h1 className={classes.Title}>{viewSelected}</h1>
      <Gapminder open={viewSelected === 'Chart'} data={chartData} />
      <Settings
        open={viewSelected === 'Settings'}
        worksheets={worksheets}
        worksheetSelected={worksheetSelected}
        setWorkbook={onSetWorkbook}
        tableauFields={tableauFields}
        fieldsSelected={fieldsSelected}
        setFieldsSelected={onSetFieldsSelected}
        settingsSaved={onSettingsSaved}
      />
      <Info open={viewSelected === 'Help'} />
      <User open={viewSelected === 'User'} />
    </div>
  )
}

export default Main
