export type Values = number[][]

export type Node = {
  [key: string]: Values | string
}

export type Data = Node[]

export type YearData = {
  [key: string]: string | number
}
