// eslint-disable-next-line import/no-unresolved
import { Worksheet } from '@tableau/extensions-api-types'

import { SelectPicker, Button } from 'rsuite'
import Card from '../../../Components/UI/Card/Card'

import classes from './Settings.module.scss'

const fieldNames: Record<string, string> = {
  dimension: 'dimension',
  time: 'time',
  category: 'category',
  xAxis: 'x-axis',
  yAxis: 'y-axis',
  color: 'color',
  size: 'size',
}

type ComponentProps = {
  open: boolean
  worksheets?: Worksheet[]
  worksheetSelected?: string | null
  setWorkbook?: (work: string) => void
  tableauFields?: Record<string, string> | null
  fieldsSelected: Record<string, string>
  setFieldsSelected: (field: string, value: string) => void
  settingsSaved?: () => void
  disabled?: boolean
}

const Settings = ({
  open,
  worksheets,
  worksheetSelected,
  setWorkbook,
  tableauFields,
  fieldsSelected,
  setFieldsSelected,
  settingsSaved,
  disabled,
}: ComponentProps): JSX.Element => {
  const worksPicker = worksheets
    ? worksheets.map((work, index) => ({
        id: index,
        label: work.name,
        value: work.name,
      }))
    : []

  const fieldsPicker = tableauFields
    ? Object.keys(tableauFields).map((key) => ({
        tableauId: key,
        label: tableauFields[key],
        value: tableauFields[key],
      }))
    : []

  const onSelectWorkbook = (work: string) => {
    if (setWorkbook) {
      setWorkbook(work)
    }
  }

  const onChangeValueField = (field: string) => (value: string) => {
    setFieldsSelected(field, value)
  }

  const onSaveButtonClicked = () => {
    if (settingsSaved) {
      settingsSaved()
    }
  }

  return (
    <Card open={open}>
      <div className={classes.Container}>
        <section className={classes.Section}>
          <h5 className={classes.Label}>Data Source</h5>
          <div className={classes.Area}>
            <div className={classes.Block}>
              <div className={classes.Work}>
                <p className={classes.Title}>Worksheet</p>
                <SelectPicker
                  data={worksPicker}
                  value={worksheetSelected}
                  disabled={disabled}
                  onChange={onSelectWorkbook}
                  searchable={false}
                />
              </div>
            </div>
            <div className={classes.Block}>
              <p className={classes.Title}>Fields</p>
              {Object.keys(fieldNames).map((key) => (
                <div key={key} className={classes.Field}>
                  <p className={classes.FieldLabel}>{fieldNames[key]}</p>
                  <SelectPicker
                    id={key}
                    data={fieldsPicker}
                    value={fieldsSelected ? fieldsSelected[key] : null}
                    disabled={disabled}
                    onChange={onChangeValueField(key)}
                    searchable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={classes.Section}>
          <h5 className={classes.Label}>Style</h5>
          <div className={classes.Area}>
            <div className={classes.Block}>
              <p className={classes.Title}>Chart Colors</p>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <Button
          className={classes.SaveButton}
          appearance="primary"
          color="green"
          size="sm"
          onClick={onSaveButtonClicked}
          disabled={disabled}
        >
          Save
        </Button>
      </footer>
    </Card>
  )
}

export default Settings
