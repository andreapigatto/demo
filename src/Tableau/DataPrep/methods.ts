// eslint-disable-next-line import/no-unresolved
import { DataTable } from '@tableau/extensions-api-types'
import { Node, Data } from '../../types'

const getTableauColumnPos = (
  tableauFields: Record<string, string> | null,
  fieldsSelected: Record<string, string>,
  field: string
) => {
  if (tableauFields) {
    return (
      Object.keys(tableauFields).find(
        (key) => tableauFields[key] === fieldsSelected[field]
      ) || false
    )
  }
  return false
}

const getTableauMeasuresPos = (
  tableauFields: Record<string, string> | null,
  tableauDimensions: number[]
) => {
  if (tableauFields) {
    return Object.keys(tableauFields).filter((key) => {
      return !tableauDimensions.some((item) => item === +key)
    })
  }
  return []
}

export const getData = (
  { data }: DataTable,
  tableauFields: Record<string, string> | null,
  fieldsSelected: Record<string, string>
): Data => {
  const result: Data = []
  let currentCountry = '-1'

  const dimensionTableauPos = +getTableauColumnPos(
    tableauFields,
    fieldsSelected,
    'dimension'
  )
  const timeTableauPos = +getTableauColumnPos(
    tableauFields,
    fieldsSelected,
    'time'
  )

  const categoryTableauPos = +getTableauColumnPos(
    tableauFields,
    fieldsSelected,
    'category'
  )

  const tableauMeasuresPos = getTableauMeasuresPos(tableauFields, [
    dimensionTableauPos,
    timeTableauPos,
    categoryTableauPos,
  ])

  let countryData: Node = {}

  data.forEach((row) => {
    if (currentCountry !== row[dimensionTableauPos].formattedValue) {
      if (Object.keys(countryData).length > 0) {
        result.push(countryData)
      }

      countryData = {}
      if (tableauFields) {
        Object.keys(tableauFields).forEach((key) => {
          if (+key !== timeTableauPos) {
            countryData = {
              ...countryData,
              [tableauFields[+key]]:
                +key === dimensionTableauPos || +key === categoryTableauPos
                  ? row[+key].formattedValue
                  : [[+row[timeTableauPos].formattedValue, +row[+key].value]],
            }
          }
        })
      }
    } else {
      tableauMeasuresPos.forEach((index) => {
        if (tableauFields) {
          countryData = {
            ...countryData,
            [tableauFields[+index]]: [
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ...countryData[tableauFields[+index]],
              [+row[timeTableauPos].formattedValue, +row[+index].value],
            ],
          }
        }
      })
    }
    currentCountry = row[0].formattedValue
  })

  return result
}

export const getColumns = ({ columns }: DataTable): Record<string, string> =>
  columns.reduce((obj: Record<string, string>, item) => {
    // eslint-disable-next-line no-param-reassign
    obj[item.index] = item.fieldName
    return obj
  }, {})
