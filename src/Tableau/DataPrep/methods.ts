// eslint-disable-next-line import/no-unresolved
import { DataTable } from '@tableau/extensions-api-types'

export const test = (): void => {
  // console.log('pippo')
}

export const getColumns = ({ columns }: DataTable): Record<string, string> =>
  columns.reduce((obj: Record<string, string>, item) => {
    // eslint-disable-next-line no-param-reassign
    obj[item.index] = item.fieldName
    return obj
  }, {})
