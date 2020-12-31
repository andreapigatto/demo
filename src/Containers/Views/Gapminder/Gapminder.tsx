import { useRef, useState } from 'react'
import Card from '../../../Components/UI/Card/Card'

import Chart from '../../Chart/Chart'
import { Data } from '../../../types'
import useResizeObserver from '../../utils'
import { Spinner } from '../../../Components/UI'
import Slider from '../../../Components/UI/Slider/Slider'

type ComponentProps = {
  open: boolean
  data: Data | null
  tableauFields?: Record<string, string> | null
  fieldsSelected: Record<string, string>
  setFieldsSelected: (field: string, value: string) => void
}

const minYear = 1800
const maxYear = 2009
const speedYear = 180

const Gapminder = ({
  open,
  data,
  tableauFields,
  fieldsSelected,
  setFieldsSelected,
}: ComponentProps): JSX.Element => {
  const refElement = useRef<HTMLDivElement | null>(null)
  const [year, setYear] = useState(minYear)
  const { width, height } = useResizeObserver(refElement)

  const onChangeHandler = (newValue: number) => {
    setYear(newValue)
  }

  return (
    <Card open={open} refElement={refElement}>
      {data ? (
        <>
          <Slider
            range={{ minValue: minYear, maxValue: maxYear }}
            value={year}
            intervalStepAnimation={speedYear}
            changed={onChangeHandler}
          />
          <Chart
            data={data}
            year={year}
            width={width}
            height={height}
            speedAnimation={speedYear}
            tableauFields={tableauFields}
            fieldsSelected={fieldsSelected}
            setFieldsSelected={setFieldsSelected}
          />
        </>
      ) : (
        <Spinner msg="WAITING DATA" />
      )}
    </Card>
  )
}

export default Gapminder
