import { SelectPicker } from 'rsuite'

import classes from './Wrapper.module.scss'

type ComponentProps = {
  year: number
  tableauFields?: Record<string, string> | null
  fieldsSelected: Record<string, string>
  setFieldsSelected: (field: string, event: string) => void
  children: JSX.Element | JSX.Element[]
}

const Wrapper = ({
  year,
  tableauFields,
  fieldsSelected,
  setFieldsSelected,
  children,
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
    <div className={classes.Container}>
      {children}
      <SelectPicker
        id="yAxis"
        className={classes.YAxis}
        data={fieldsPicker}
        value={fieldsSelected.yAxis}
        onChange={onChangeValueField('yAxis')}
        searchable={false}
      />
      <SelectPicker
        id="xAxis"
        className={classes.XAxis}
        data={fieldsPicker}
        value={fieldsSelected.xAxis}
        onChange={onChangeValueField('xAxis')}
        searchable={false}
      />
      <div className={classes.XAxisLabel}>
        <p>Income per Capita (dollars)</p>
      </div>
      <div className={classes.YAxisLabel}>
        <p>Life expectancy (years)</p>
      </div>
      <div className={classes.YearLabel}>
        <h3>{year}</h3>
      </div>
    </div>
  )
}

export default Wrapper
