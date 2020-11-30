export type Values = number[][]

export type Data = {
  name: string
  region: string
  income: Values
  population: Values
  lifeExpectancy: Values
}[]

export type YearData = {
  name: string
  region: string
  income: number
  population: number
  lifeExpectancy: number
}

export type SelectOptions = { label: string; value: string }[]
