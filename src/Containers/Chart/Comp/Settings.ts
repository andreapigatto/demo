import * as d3 from 'd3'
import { Data, Values, YearData } from '../../../types'

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

const dataAt = (currentYear: number, data: Data): YearData[] =>
  data.map((d) => ({
    name: d.name,
    region: d.region,
    income: valueAt(d.income, currentYear),
    population: valueAt(d.population, currentYear),
    lifeExpectancy: valueAt(d.lifeExpectancy, currentYear),
  }))

export default dataAt
