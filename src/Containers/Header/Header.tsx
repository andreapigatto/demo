// eslint-disable-next-line import/no-unresolved
import { Worksheet } from '@tableau/extensions-api-types'
import classes from './Header.module.scss'

type ComponentProps = {
  viewSelected: string
  worksheets?: Worksheet[]
  worksheetSelected?: string | null
  setWorkbook?: (work: string | null) => void
  tableauFields?: Record<string, string> | null
  fieldsSelected?: Record<string, string>
  setFieldsSelected?: (field: string, value: string) => void
  resetWorkbook?: () => void
  resetFieldsSelected?: (field: string) => void
}

const Header = ({ viewSelected }: ComponentProps): JSX.Element => (
  <div className={classes.Header}>
    <h1 className={classes.Title}>{viewSelected}</h1>
  </div>
)

export default Header
