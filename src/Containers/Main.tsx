import { useState } from 'react'
import data from '../Data/nations.json'
import Chart from './Chart/Chart'
import Slider from '../Components/Slider/Slider'
import useWindowSize from './utils'

const minYear = 1800
const maxYear = 2009
const speedYear = 100

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Main = () => {
  const [year, setYear] = useState(minYear)
  const [width, height] = useWindowSize()

  const onChangeHandler = (newValue: number) => {
    setYear(newValue)
  }

  return (
    <>
      <Slider
        range={{ minValue: minYear, maxValue: maxYear }}
        value={year}
        intervalStepAnimation={speedYear}
        changed={onChangeHandler}
      />
      <Chart data={data} year={year} width={width} height={height} />
    </>
  )
}

export default Main
