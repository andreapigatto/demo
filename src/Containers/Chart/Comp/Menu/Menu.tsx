import { SelectPicker } from 'rsuite'
import classes from './Menu.module.scss'

import Legend from '../Legend/Legend'

import { Values } from '../../../../types'

type ComponentProps = {
  tableauFields?: Record<string, string> | null
  fieldsSelected: Record<string, string>
  setFieldsSelected?: (field: string, event: string) => void
  legendColor: d3.ScaleOrdinal<string | Values, string, string>
  legendData: string[]
  disabled?: boolean
}

const Menu = ({
  tableauFields,
  fieldsSelected,
  setFieldsSelected,
  legendColor,
  legendData,
  disabled,
}: ComponentProps): JSX.Element => {
  const fieldsPicker = tableauFields
    ? Object.keys(tableauFields).map((key) => ({
        tableauId: key,
        label: tableauFields[key],
        value: tableauFields[key],
      }))
    : []

  const onChangeValueField = (field: string) => (value: string) => {
    if (setFieldsSelected) {
      setFieldsSelected(field, value)
    }
  }

  return (
    <div className={classes.Menu}>
      <div className={classes.Block}>
        <p>Color</p>
        <SelectPicker
          id="color"
          data={fieldsPicker}
          value={fieldsSelected ? fieldsSelected.color : null}
          disabled={disabled}
          onChange={onChangeValueField('color')}
          searchable={false}
        />
      </div>
      <Legend color={legendColor} data={legendData} />
      <div className={classes.Block}>
        <p>Size</p>
        <SelectPicker
          id="size"
          data={fieldsPicker}
          value={fieldsSelected ? fieldsSelected.size : null}
          disabled={disabled}
          onChange={onChangeValueField('size')}
          searchable={false}
        />
      </div>
    </div>
  )
}

export default Menu
