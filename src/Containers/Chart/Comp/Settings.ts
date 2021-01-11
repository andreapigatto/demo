import * as d3 from 'd3'
import { Data, Values, YearData } from '../../../types'

export const menuWidth = 240
export const sliderWidth = 22

const bisectYear = d3.bisector(([yearBis]) => yearBis).left

const valueAt = (values: Values, yearSelected: number) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const i = bisectYear(values, yearSelected, 0, values.length - 1)
  const a = values[i]
  if (i > 0) {
    const b = values[i - 1]
    const t = (yearSelected - a[0]) / (b[0] - a[0])
    return a[1] * (1 - t) + b[1] * t
  }
  return a[1]
}

export const dataAt = (currentYear: number, data: Data): YearData[] => {
  const yearData: YearData[] = []
  data.forEach((item) => {
    let node = {}
    Object.keys(item).forEach((key) => {
      node = {
        ...node,
        // TODO: FIX HERE AND IN DATAPREP/METHODS. NEED TO BE IMPROVED AND DYNAMIC
        [key]:
          key === 'country' ||
          key === 'region' ||
          key === 'Country' ||
          key === 'Region'
            ? item[key]
            : valueAt(item[key] as Values, currentYear),
      }
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    yearData.push(node)
  })
  return yearData
}
