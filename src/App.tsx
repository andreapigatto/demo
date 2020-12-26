import { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-unresolved
import { Worksheet } from '@tableau/extensions-api-types'

import Main from './Containers/Main'
import MainTableau from './Containers/MainTableau'

import { init } from './Tableau'
import { Spinner } from './Components/UI'

const App = (): JSX.Element => {
  const [worksheets, setWorkSheets] = useState<Worksheet[]>([])
  const [mode, setMode] = useState<string | null>(null)

  useEffect(
    () =>
      /* I try to initialize Tableau. If in Tableau environment will receive a promise,
       * call the callback and update isTableau state to 'tableau' and render <MainTableau>
       * If not, isTableau will be set to 'browser' and I will render <Main> that will point a json file
       * for demo purpose instead of Tableau Workbook
       * null as initial state is for loading with spinner
       */
      init(
        (dash) => {
          const works = dash.worksheets.map((worksheet: Worksheet) => worksheet)
          setWorkSheets(works)
          setMode('tableau')
        },
        () => {
          setMode('browser')
        }
      ),
    []
  )

  let render = <Spinner msg="LOADING..." />
  if (mode === 'tableau') {
    render = <MainTableau worksheets={worksheets} />
  } else if (mode === 'browser') {
    render = <Main />
  }

  return render
}

export default App
